import { BlogPostContentPiece, EditType } from "./blog-post-content-piece";

export interface BlogPostContentImage extends BlogPostContentPiece {
    file: File | null,
    imageUrl: string | null,
}