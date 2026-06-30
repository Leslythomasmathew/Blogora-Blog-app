import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const res = await fetch("https://raw.githubusercontent.com/Leslythomasmathew/Blogora-Blog-app/main/db.json", {
      next: { revalidate: 60 } // Cache for 1 minute
    });

    if (!res.ok) {
      throw new Error("Failed to fetch mock API database");
    }

    const data = await res.json();
    const posts = data.posts || [];
    const post = posts.find((p: any) => p.id === id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("API error fetching post:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch post" },
      { status: 500 }
    );
  }
}
