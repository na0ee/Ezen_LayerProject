export type CommunityUserPost = {
  id: string;
  category: "리뷰" | "질문" | "향 추천";
  kind?: "post" | "poll";
  title: string;
  text: string;
  keywords: string[];
  images: string[];
  pollOptions?: string[];
  createdAt: number;
};

export const COMMUNITY_POSTS_STORAGE_KEY = "layer-community-user-posts";

export function loadCommunityUserPosts(): CommunityUserPost[] {
  try {
    const stored = JSON.parse(
      localStorage.getItem(COMMUNITY_POSTS_STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function saveCommunityUserPosts(posts: CommunityUserPost[]) {
  localStorage.setItem(COMMUNITY_POSTS_STORAGE_KEY, JSON.stringify(posts));
}
