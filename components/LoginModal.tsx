"use client";

import { useState, FormEvent } from "react";
import { X, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(email);
      onClose();
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-up z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none"
          aria-label="Close modal"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100/50 dark:border-violet-900/30">
              <img src="/logo.jpg" alt="Blogora Logo" className="h-9 w-9 rounded-lg object-cover object-top" />
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-zinc-50 pr-2">
                Blogora
              </span>
            </div>
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-zinc-100">
            Welcome back
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400">
            Sign in to access your dashboard, customize reading lists, and bookmark insights.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3.5 text-xs rounded-xl bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/20">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200/80 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-50 dark:placeholder-zinc-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                Password
              </label>
              <span className="text-2xs font-semibold text-violet-600 dark:text-violet-400 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200/80 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-50 dark:placeholder-zinc-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 dark:text-zinc-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 disabled:opacity-50 transition-colors duration-200 shadow-md shadow-violet-500/10 focus-visible:outline-none"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer actions */}
        <div className="mt-6 text-center border-t border-slate-100 dark:border-zinc-800/80 pt-4">
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <span className="text-violet-600 dark:text-violet-400 font-semibold cursor-pointer hover:underline">
              Create account
            </span>
          </p>
          <button
            onClick={onClose}
            className="cursor-pointer mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
          >
            Continue as Guest
          </button>
        </div>

      </div>
    </div>
  );
}
