import { Post } from "./data";

// Helper to normalize and unpack posts from raw JSON response formats
function parseResponse(data: any): Post[] {
  let posts = Array.isArray(data) ? data : (data.posts || []);
  
  // Safeguard: If MockAPI returned a single wrapper object containing the actual posts array
  // (which happens if the full db.json structure is copy-pasted into the resource editor)
  if (posts.length === 1 && posts[0] && Array.isArray(posts[0].posts)) {
    return posts[0].posts;
  }
  
  return posts;
}

export async function getMockPosts(): Promise<Post[]> {
  const baseUrl = process.env.NEXT_PUBLIC_MOCK_API_BASE_URL || 
                  "https://raw.githubusercontent.com/Leslythomasmathew/Blogora-Blog-app/main/db.json";
  
  // Decide endpoint path: MockAPI URLs need a resource path like "/posts"
  let url = baseUrl;
  if (baseUrl.includes("mockapi.io")) {
    url = baseUrl.endsWith("/") ? `${baseUrl}posts` : `${baseUrl}/posts`;
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    
    // If the standard "/posts" path fails on mockapi, fall back to check "/api/v1/posts"
    if (!res.ok && baseUrl.includes("mockapi.io")) {
      const fallbackUrl = baseUrl.endsWith("/") ? `${baseUrl}api/v1/posts` : `${baseUrl}/api/v1/posts`;
      const fallbackRes = await fetch(fallbackUrl, { next: { revalidate: 60 } });
      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        return parseResponse(data);
      }
    }

    if (!res.ok) {
      console.warn(`Failed to fetch from mock API: ${res.status}. Using local database fallback.`);
      const { MOCK_POSTS } = await import("./data");
      return MOCK_POSTS;
    }

    const data = await res.json();
    return parseResponse(data);
  } catch (error) {
    console.error("Error loading posts from mock API, using local fallback:", error);
    
    // Import local MOCK_POSTS dynamically to prevent circular dependencies
    const { MOCK_POSTS } = await import("./data");
    return MOCK_POSTS;
  }
}

export async function getMockPostById(id: string): Promise<Post | null> {
  const posts = await getMockPosts();
  return posts.find((post) => post.id === id) || null;
}
