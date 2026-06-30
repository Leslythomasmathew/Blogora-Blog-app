import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Link as LinkIcon } from "lucide-react";
import { TwitterIcon, FacebookIcon } from "@/components/BrandIcons";
import { Post } from "@/lib/data";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import AudioReader from "@/components/AudioReader";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://raw.githubusercontent.com/Leslythomasmathew/Blogora-Blog-app/main/db.json", {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error("Failed to load posts from mock API:", error);
    return [];
  }
}

// Generate dynamic SEO metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

// Enable Next.js to statically pre-render these dynamic paths at build time (SSG optimization)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  // Find related articles (same category, excluding current post)
  let relatedPosts = posts.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  // Fallback to random posts if not enough in same category
  if (relatedPosts.length < 3) {
    const additional = posts.filter(
      (p) => p.id !== post.id && !relatedPosts.some((r) => r.id === p.id)
    ).slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additional];
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow animate-fade-in">
        {/* Article Container */}
        <article className="py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors group focus-visible:outline-none focus-visible:underline"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to articles
              </Link>
            </div>

            {/* Article Header */}
            <header className="space-y-6 mb-10">
              {/* Category tag */}
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300 border border-violet-100/50 dark:border-violet-800/30">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-[1.15]">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg sm:text-xl text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                {post.excerpt}
              </p>

              {/* Author & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-slate-100 dark:border-zinc-900/60">
                <div className="flex items-center gap-3.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-12 w-12 rounded-full object-cover border border-slate-100 dark:border-zinc-800 shadow-sm"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                      {post.author.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400">
                      {post.author.role}
                    </div>
                  </div>
                </div>

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
            </header>

            {/* Cover Image */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-zinc-900/60 shadow-lg shadow-slate-100/50 dark:shadow-none mb-12">
              <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-zinc-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Audio Reader Panel */}
            <div className="mb-10">
              <AudioReader articleHtml={post.content} title={post.title} />
            </div>

            {/* Layout with Content and Sticky Share panel */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Sticky Social Share Panel (Desktop) */}
              <div className="hidden lg:block lg:col-span-2 sticky top-24 pt-6 space-y-4">
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
                  Share
                </span>
                <div className="flex flex-col gap-2.5">
                  <button className="flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" aria-label="Share on Twitter">
                    <TwitterIcon className="h-4.5 w-4.5" />
                  </button>
                  <button className="flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" aria-label="Share on Facebook">
                    <FacebookIcon className="h-4.5 w-4.5" />
                  </button>
                  <button className="flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" aria-label="Copy page link">
                    <LinkIcon className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Main Article Content */}
              <div className="lg:col-span-10">
                <div
                  className="prose dark:prose-invert max-w-none text-slate-700 dark:text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Mobile Share section */}
                <div className="lg:hidden flex items-center gap-3 mt-12 py-6 border-t border-b border-slate-100 dark:border-zinc-900/60">
                  <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mr-2">
                    Share this article:
                  </span>
                  <button className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors" aria-label="Share on Twitter">
                    <TwitterIcon className="h-4.5 w-4.5" />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors" aria-label="Share on Facebook">
                    <FacebookIcon className="h-4.5 w-4.5" />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors" aria-label="Copy page link">
                    <LinkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* Related Articles Section */}
        <section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-zinc-900/10 border-t border-slate-100 dark:border-zinc-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
