"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X, Loader2, BookOpen } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { Post } from "@/lib/data";

interface BlogGridProps {
  initialPosts: Post[];
}

const CATEGORIES = ["All", "Design", "Tech", "SaaS", "Productivity", "Marketing"];

export default function BlogGrid({ initialPosts }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query to prevent excessive API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch posts from local API route using React Query
  const { data: posts = [], isLoading, isFetching } = useQuery<Post[]>({
    queryKey: ["posts", selectedCategory, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (debouncedSearch) {
        params.append("search", debouncedSearch);
      }
      
      const res = await fetch(`/api/posts?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    // Use server-side data as initial cache (only works on first fetch)
    initialData: selectedCategory === "All" && !debouncedSearch ? initialPosts : undefined,
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section id="articles" className="py-12 sm:py-16 md:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-10 animate-fade-up">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 text-sm sm:text-base">
            Expert insights, tutorials, and discussions on modern web development.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-10 pb-4 border-b border-slate-100 dark:border-zinc-900/60 animate-fade-up">
          {/* Category Pills Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200/60 hover:border-slate-300 dark:bg-zinc-900/40 dark:text-zinc-400 dark:border-zinc-800/80 dark:hover:border-zinc-700"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500">
              {isFetching && !isLoading ? (
                <Loader2 className="h-4.5 w-4.5 animate-spin text-violet-600 dark:text-violet-400" />
              ) : (
                <Search className="h-4.5 w-4.5" />
              )}
            </div>
            
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200/80 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/10 transition-all duration-200"
              aria-label="Search articles"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 dark:text-zinc-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading Spinner for Initial Load */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 animate-fade-in">
            <Loader2 className="h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">Loading articles...</span>
          </div>
        ) : posts.length > 0 ? (
          /* Grid of Article Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-in">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white dark:bg-zinc-900/20 border border-dashed border-slate-200 dark:border-zinc-800/80 rounded-2xl animate-fade-in">
            <div className="p-4 rounded-full bg-slate-50 dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">No articles found</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400 max-w-sm">
              We couldn&apos;t find any articles matching your filters. Try adjusting your query or clear the filter settings.
            </p>
            <button
              onClick={clearFilters}
              className="cursor-pointer mt-6 px-4.5 py-2 text-sm font-semibold rounded-xl text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
