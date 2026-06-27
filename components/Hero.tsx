import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Post } from "@/lib/data";

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 md:py-16">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-900/10" />
      <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center animate-fade-up">
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300 border border-violet-100/50 dark:border-violet-800/30">
                Featured: {post.category}
              </span>
            </div>

            {/* Title */}
            <Link href={`/posts/${post.id}`} className="group focus-visible:outline-none">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-[1.15] group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-250">
                {post.title}
              </h1>
            </Link>

            {/* Excerpt */}
            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

            {/* Author and Date Meta */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-11 w-11 rounded-full object-cover border-2 border-white dark:border-zinc-900 shadow-sm"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-zinc-100">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Separator line */}
              <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-zinc-800" />

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Read button */}
            <div className="mt-8">
              <Link
                href={`/posts/${post.id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors group focus-visible:outline-none focus-visible:underline"
              >
                Read Full Article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Featured Image */}
          <div className="lg:col-span-6 animate-fade-in">
            <Link
              href={`/posts/${post.id}`}
              className="block relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-zinc-900/60 shadow-lg shadow-slate-200/40 dark:shadow-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-100 dark:bg-zinc-900 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
