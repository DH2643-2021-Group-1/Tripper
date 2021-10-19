type BlogPostContentType = "title" | "paragraph" | "image";
export enum EditType {
    none,
    delete,
    new,
    edited,
}

export interface BlogPostContentPiece {
    type: BlogPostContentType,
    id: string,
    order: number,
    editType: EditType,
}