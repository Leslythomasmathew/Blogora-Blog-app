import { MOCK_POSTS } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import Footer from "@/components/Footer";

export default function Home() {
  // Retrieve featured post (fallback to first post if none matches)
  const featuredPost = MOCK_POSTS.find((post) => post.featured) || MOCK_POSTS[0];
  
  // Filter out the featured post from the main grid list to avoid duplication
  const gridPosts = MOCK_POSTS.filter((post) => post.id !== featuredPost.id);

  return (
    <>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* Featured Post Hero Banner */}
        <Hero post={featuredPost} />
        
        {/* Dynamic Filterable Articles Grid */}
        <BlogGrid initialPosts={gridPosts} />
      </main>

      {/* Modern footer */}
      <Footer />
    </>
  );
}
