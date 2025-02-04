import { getBlogPosts } from "@/data/blog";
import { MetadataRoute } from "next";

// For larger blogs, you might want to use generateSitemaps
// but for now, let's keep it simple since you likely won't exceed 50,000 posts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    url: `https://parsatajik.com/posts/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
}
