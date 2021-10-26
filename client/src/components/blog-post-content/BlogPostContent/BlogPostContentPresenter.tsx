import React, { FC } from "react";
import {
  BlogPostContent,
  BlogPostContentPieceAny,
} from "../../../models/blog-post-content/blog-post-content";
import { EditType } from "../../../models/blog-post-content/blog-post-content-piece";
import BlogPostContentView from "./BlogPostContentView";

interface BlogPostContentPresenterProps {
  content: BlogPostContent;
  editMode: boolean;
  onContentEdited?: (content: BlogPostContent) => void;
}

export interface BlogPostContentEditRequest {
  contentPieceIndex: number;
  contentPieceToUpdate: BlogPostContentPieceAny;
}

const BlogPostContentPresenter: FC<BlogPostContentPresenterProps> = (props) => {
  const handleEditRequest = (editedPiece: BlogPostContentPieceAny) => {
    if (props.onContentEdited == null) return;
    editedPiece.editType = EditType.edited;
    const pieces = [...props.content.contentPieces];
    pieces[getPieceIndexFromId(editedPiece.id)] = editedPiece;
    props.onContentEdited({
      ...props.content,
      contentPieces: pieces,
    });
  };

  const handleReorder = (contentPieces: BlogPostContentPieceAny[]) => {
    if (props.onContentEdited == null) return;
    props.onContentEdited({
      ...props.content,
      contentPieces: contentPieces,
    });
  };

  const handleDelete = (pieceToDelete: BlogPostContentPieceAny) => {
    if (props.onContentEdited == null) return;
    const pieces = [...props.content.contentPieces];
    pieces[getPieceIndexFromId(pieceToDelete.id)].editType = EditType.delete;
    props.onContentEdited({
      ...props.content,
      contentPieces: pieces,
    });
  };

  const getPieceIndexFromId = (id: string) => {
    return props.content.contentPieces.findIndex((piece) => piece.id == id);
  };

  const filterOutDeletedPieces = (pieces: BlogPostContentPieceAny[]) => {
    return pieces.filter((piece) => piece.editType != EditType.delete);
  };

  return (
    <BlogPostContentView
      contentPiecesToRender={filterOutDeletedPieces(
        props.content.contentPieces
      )}
      editMode={props.editMode}
      onEditRequest={handleEditRequest}
      onDelete={handleDelete}
      onReorder={handleReorder}
    />
  );
};

export default BlogPostContentPresenter;
