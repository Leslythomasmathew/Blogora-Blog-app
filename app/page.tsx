import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import Footer from "@/components/Footer";
import { getMockPosts } from "@/lib/api";

export default async function Home() {
  const posts = await getMockPosts();

  // Retrieve featured post (fallback to first post if none matches)
  const featuredPost = posts.find((post) => post.featured) || posts[0] || null;
  
  // Filter out the featured post from the main grid list to avoid duplication
  const gridPosts = featuredPost 
    ? posts.filter((post) => post.id !== featuredPost.id)
    : posts;

  return (
    <>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* Featured Post Hero Banner */}
        {featuredPost && <Hero post={featuredPost} />}
        
        {/* Dynamic Filterable Articles Grid */}
        <BlogGrid initialPosts={gridPosts} />
      </main>

      {/* Modern footer */}
      <Footer />
    </>
  );
}
