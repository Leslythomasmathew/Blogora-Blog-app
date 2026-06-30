import { NextRequest, NextResponse } from "next/server";
import { getMockPosts } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    let filtered = await getMockPosts();

    // Filter by Category
    if (category && category.toLowerCase() !== "all") {
      filtered = filtered.filter(
        (post: any) => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Search Query
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (post: any) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    return NextResponse.json(filtered);
  } catch (error: any) {
    console.error("API error fetching posts:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
