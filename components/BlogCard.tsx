import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Post } from "@/lib/data";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col h-full bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Article Image wrapper */}
      <Link
        href={`/posts/${post.id}`}
        className="block relative overflow-hidden aspect-[16/10] w-full bg-slate-100 dark:bg-zinc-900 focus-visible:outline-none"
      >
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category Pill */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-violet-50 text-violet-700 dark:bg-violet-950/20 dark:text-violet-400 border border-violet-100/40 dark:border-violet-900/30">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.id}`} className="mt-3 group/title focus-visible:outline-none">
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 leading-snug group-hover/title:text-violet-600 dark:group-hover/title:text-violet-400 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Description Excerpt */}
        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Flex Spacer */}
        <div className="flex-1 min-h-6" />

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 dark:bg-zinc-900/80 my-4" />

        {/* Footer Meta */}
        <div className="flex items-center justify-between gap-3">
          {/* Author avatar & info */}
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-8 w-8 rounded-full object-cover border border-slate-100 dark:border-zinc-800"
            />
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                {post.author.name}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-zinc-500">
                {post.author.role}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400 dark:text-zinc-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{post.date.split(",")[0]}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
