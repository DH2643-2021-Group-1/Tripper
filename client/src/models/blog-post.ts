import { Author } from "./author";

export interface BlogPost {
    id: BlogPostId,
    title: string,
    primaryImage: string,
    description: string,
    content: string,
    author: Author,
    publicationDate: Date,
}

export type BlogPostId = string;