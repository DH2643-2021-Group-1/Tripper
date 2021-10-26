import { Author } from "./author";
import { BlogPostContent } from "./blog-post-content/blog-post-content";

export interface BlogPost {
  id: BlogPostId;
  title: string;
  primaryImage: string;
  description: string;
  content: BlogPostContent;
  author: Author;
  publicationDate: Date;
}

export type BlogPostId = string;
