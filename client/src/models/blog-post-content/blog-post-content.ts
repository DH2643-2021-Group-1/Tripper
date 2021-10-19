import { BlogPostContentImage } from "./blog-post-content-image";
import { BlogPostContentParagraph } from "./blog-post-content-paragraph";
import { BlogPostContentTitle } from "./blog-post-content-title";

export type BlogPostContentPieceAny =
    BlogPostContentTitle |
    BlogPostContentParagraph |
    BlogPostContentImage;


export interface BlogPostContent {
    /** The content of the blog post. Can be a title, paragraph, or image */
    contentPieces: BlogPostContentPieceAny[]
}