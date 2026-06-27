"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch by waiting until mounted
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 dark:border-zinc-900/60 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none">
              <img src="/logo.jpg" alt="Blogora Logo" className="h-8 w-8 rounded-lg object-cover object-top border border-slate-200/40 dark:border-zinc-800/50" />
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-zinc-50">
                Blogora<span className="text-violet-600 dark:text-violet-400">.</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400 border border-slate-200/50 dark:border-zinc-800/50">
                Blog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-50 transition-colors"
              >
                Home
              </Link>
              <a
                href="#articles"
                className="text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-50 transition-colors"
              >
                Articles
              </a>
            </nav>
          </div>

          {/* Right Section Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl border border-slate-200/50 dark:border-zinc-800/60 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-4.5 w-4.5 text-zinc-300" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-slate-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl md:hidden text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 dark:border-zinc-900/60 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-3 transition-colors duration-300 animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-50 transition-colors"
            >
              Home
            </Link>
            <a
              href="#articles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-medium rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-50 transition-colors"
            >
              Articles
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
