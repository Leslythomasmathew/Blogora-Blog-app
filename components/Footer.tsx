import Link from "next/link";
import { GithubIcon, TwitterIcon, DribbbleIcon, LinkedinIcon } from "@/components/BrandIcons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 dark:border-zinc-900/60 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none">
              <img src="/logo.jpg" alt="Blogora Logo" className="h-8 w-8 rounded-lg object-cover object-top border border-slate-200/40 dark:border-zinc-800/50" />
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-zinc-50">
                Blogora<span className="text-violet-600 dark:text-violet-400">.</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-slate-100 text-slate-600 dark:bg-zinc-900 dark:text-zinc-400 border border-slate-200/50 dark:border-zinc-800/50">
                Blog
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Exposing design tokens, code patterns, and productivity workflows to help you build stunning, high-converting product interfaces.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Twitter link"
              >
                <TwitterIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="GitHub link"
              >
                <GithubIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="Dribbble link"
              >
                <DribbbleIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                aria-label="LinkedIn link"
              >
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Articles Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Latest Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-slate-500 dark:text-zinc-400 cursor-pointer hover:text-slate-900 dark:hover:text-zinc-100 transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-500 dark:text-zinc-400 cursor-pointer hover:text-slate-900 dark:hover:text-zinc-100 transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-500 dark:text-zinc-400 cursor-pointer hover:text-slate-900 dark:hover:text-zinc-100 transition-colors">
                  Cookie Settings
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="w-full h-px bg-slate-100 dark:bg-zinc-900/60 my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400 dark:text-zinc-500 text-center">
          <span>&copy; {new Date().getFullYear()} Blogora. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
