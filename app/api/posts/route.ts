import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const res = await fetch("https://raw.githubusercontent.com/Leslythomasmathew/Blogora-Blog-app/main/db.json", {
      next: { revalidate: 60 } // Cache for 1 minute
    });

    if (!res.ok) {
      throw new Error("Failed to fetch mock API database");
    }

    const data = await res.json();
    let filtered = data.posts || [];

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
