import { NextRequest, NextResponse } from "next/server";
import { MOCK_POSTS } from "@/lib/data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    let filtered = [...MOCK_POSTS];

    // Filter by Category
    if (category && category.toLowerCase() !== "all") {
      filtered = filtered.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Search Query
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    // Simulate network delay for a more realistic loading state in React Query
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("API error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
