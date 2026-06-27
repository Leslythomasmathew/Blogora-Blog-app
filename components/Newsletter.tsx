"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call for newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-12 sm:py-16 scroll-mt-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 dark:bg-zinc-900/20 border border-slate-900 dark:border-zinc-800/80 px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 shadow-xl shadow-slate-950/20">
          
          {/* Subtle Background Radial Gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-3xl" />
          
          <div className="mx-auto max-w-2xl text-center">
            {/* Title */}
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Stay Ahead of the Curve
            </h2>
            
            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-slate-400 dark:text-zinc-400 leading-relaxed">
              Subscribe to the Beyond.UI newsletter for the latest SaaS design tokens, front-end architecture guidelines, and tech deep dives. No spam, unsubscribe anytime.
            </p>

            {/* Form */}
            <div className="mt-8 mx-auto max-w-md">
              {submitted ? (
                /* Success Message */
                <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-violet-950/40 border border-violet-800/40 text-violet-200 animate-fade-in">
                  <CheckCircle2 className="h-8 w-8 text-violet-400" />
                  <div className="text-center">
                    <p className="text-base font-bold">Successfully Subscribed!</p>
                    <p className="text-xs text-violet-300 mt-1">Thank you for joining our newsletter community.</p>
                  </div>
                </div>
              ) : (
                /* Subscription Input Form */
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                      aria-label="Email address"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl text-slate-950 bg-white hover:bg-slate-100 dark:text-white dark:bg-violet-600 dark:hover:bg-violet-500 disabled:opacity-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    {loading ? (
                      <span className="h-4 w-4 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Privacy note */}
            {!submitted && (
              <p className="mt-3 text-2xs text-slate-500 dark:text-zinc-500">
                We protect your data. Read our Privacy Policy.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
