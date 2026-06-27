"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";

interface AudioReaderProps {
  articleHtml: string;
  title: string;
}

export default function AudioReader({ articleHtml, title }: AudioReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(true);
    }
    
    // Stop speaking when leaving the page
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getCleanText = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    
    // Extract headers and paragraphs text for a natural read flow
    const textContent = div.textContent || div.innerText || "";
    // Clean up extra spacing
    return textContent.replace(/\s+/g, " ").trim();
  };

  const startSpeaking = () => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const cleanText = `${title}. ... ${getCleanText(articleHtml)}`;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Apply speech preferences
    utterance.rate = speechRate;
    
    // Handle events to keep UI states synchronized
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const togglePlayPause = () => {
    if (!isSupported) return;

    const synth = window.speechSynthesis;

    if (!isPlaying) {
      startSpeaking();
    } else if (isPaused) {
      synth.resume();
      setIsPaused(false);
    } else {
      synth.pause();
      setIsPaused(true);
    }
  };

  const stopSpeaking = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Dynamically update speech rate mid-speech
  const handleRateChange = (newRate: number) => {
    setSpeechRate(newRate);
    if (isPlaying) {
      // To apply rate changes in SpeechSynthesis, we must restart from current position or restart speech
      // For simplicity, restarting speech works best
      setTimeout(() => {
        startSpeaking();
      }, 50);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="w-full bg-slate-50 dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
      
      {/* Player info & controls */}
      <div className="flex items-center gap-4">
        {/* Main Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="cursor-pointer flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          aria-label={isPlaying && !isPaused ? "Pause article narration" : "Listen to article"}
        >
          {isPlaying && !isPaused ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
          )}
        </button>

        {/* Stop Button */}
        {isPlaying && (
          <button
            onClick={stopSpeaking}
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-colors duration-200 focus-visible:outline-none"
            aria-label="Stop reading"
          >
            <Square className="h-4 w-4" fill="currentColor" />
          </button>
        )}

        {/* Text descriptions */}
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-slate-400 dark:text-zinc-500 tracking-wider uppercase flex items-center gap-1.5">
            <Volume2 className="h-3.5 w-3.5" />
            Audio Reader
          </div>
          <div className="text-sm font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-2">
            {isPlaying ? (
              isPaused ? "Narration Paused" : "Listening to Article..."
            ) : (
              "Listen to this Article"
            )}
            
            {/* Animated Waveform if playing */}
            {isPlaying && !isPaused && (
              <div className="flex items-end gap-0.5 h-3.5 pb-0.5">
                <span className="w-0.75 bg-violet-500 dark:bg-violet-400 rounded-full animate-[bounce_0.8s_infinite] [animation-delay:-0.4s] h-3" />
                <span className="w-0.75 bg-violet-500 dark:bg-violet-400 rounded-full animate-[bounce_0.6s_infinite] [animation-delay:-0.2s] h-1.5" />
                <span className="w-0.75 bg-violet-500 dark:bg-violet-400 rounded-full animate-[bounce_0.8s_infinite] [animation-delay:-0.6s] h-4" />
                <span className="w-0.75 bg-violet-500 dark:bg-violet-400 rounded-full animate-[bounce_0.5s_infinite] h-2.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Speed Controls */}
      <div className="flex items-center gap-2 self-start sm:self-center">
        <span className="text-xs font-medium text-slate-400 dark:text-zinc-500 mr-1">Speed:</span>
        {[1.0, 1.25, 1.5, 2.0].map((rate) => {
          const isActive = speechRate === rate;
          return (
            <button
              key={rate}
              onClick={() => handleRateChange(rate)}
              className={`cursor-pointer px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                isActive
                  ? "bg-slate-900 border-slate-900 text-white dark:bg-zinc-50 dark:border-zinc-50 dark:text-zinc-950 font-bold"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-zinc-900/60 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700"
              }`}
            >
              {rate}x
            </button>
          );
        })}
      </div>
      
    </div>
  );
}
