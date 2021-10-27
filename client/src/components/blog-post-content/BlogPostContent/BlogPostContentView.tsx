import React, { FC } from "react";
import { ReactSortable } from "react-sortablejs";
import { BlogPostContentPieceAny } from "../../../models/blog-post-content/blog-post-content";
import { BlogPostContentImage } from "../../../models/blog-post-content/blog-post-content-image";
import { BlogPostContentParagraph } from "../../../models/blog-post-content/blog-post-content-paragraph";
import {
  BlogPostContentPiece,
  EditType,
} from "../../../models/blog-post-content/blog-post-content-piece";
import { BlogPostContentTitle } from "../../../models/blog-post-content/blog-post-content-title";
import ContentWrapper from "../../content-wrapper/content-wrapper";
import BlogPostContentEditWrapper from "../BlogPostContentEditWrapper/BlogPostContentEditWrapper";
import BlogPostContentImagePresenter from "../BlogPostContentImage/BlogPostContentImagePresenter";
import BlogPostContentNoContentPlaceholder from "../BlogPostContentNoContentPlaceholder/BlogPostContentNoContentPlaceholder";
import BlogPostContentParagraphPresenter from "../BlogPostContentParagraph/BlogPostContentParagraphPresenter";
import BlogPostContentParagraphView from "../BlogPostContentParagraph/BlogPostContentParagraphView";
import BlogPostContentTitlePresenter from "../BlogPostContentTitle/BlogPostContentTitlePresenter";
import BlogPostContentToolbox from "../BlogPostContentToolbox/BlogPostContentToolboxPresenter";
import "./BlogPostContentView.scss";

interface BlogPostContentViewProps {
  contentPiecesToRender: BlogPostContentPieceAny[];
  editMode: boolean;
  onEditRequest: (contentPiece: BlogPostContentPieceAny) => void;
  onReorder: (contentPieces: BlogPostContentPieceAny[]) => void;
  onDelete: (contentPieces: BlogPostContentPieceAny) => void;
}

const BlogPostContentView: FC<BlogPostContentViewProps> = (props) => {
  const renderCorrectPieceView = (
    piece: BlogPostContentPiece,
    index: number,
  ) => {
    switch (piece.type) {
      case "title":
        return (
          <BlogPostContentTitlePresenter
            editMode={props.editMode}
            onPieceUpdate={(updatedPiece) => props.onEditRequest(updatedPiece)}
            piece={piece as BlogPostContentTitle}
          />
        );
      case "paragraph":
        return (
          <BlogPostContentParagraphPresenter
            editMode={props.editMode}
            onPieceUpdate={(updatedPiece) => props.onEditRequest(updatedPiece)}
            piece={piece as BlogPostContentParagraph}
          />
        );
      case "image":
        return (
          <BlogPostContentImagePresenter
            editMode={props.editMode}
            onPieceUpdate={(updatedPiece) => props.onEditRequest(updatedPiece)}
            piece={piece as BlogPostContentImage}
          />
        );
      default:
        return <div>Could not load content</div>;
    }
  };

  const shouldRenderPiece = (piece: BlogPostContentPiece) => {
    return piece.editType != EditType.delete;
  };

  const renderEditTools = () => {
    if (!props.editMode) return <></>;
    return (
      <div className="blog-post-content-view__toolbox-container">
        <BlogPostContentToolbox />
      </div>
    );
  };

  const renderNoContentPlaceholder = () => {
    if (!props.editMode) return <></>;
    if (props.contentPiecesToRender.length != 0) return <></>;
    return <BlogPostContentNoContentPlaceholder />;
  };

  return (
    <ContentWrapper>
      <div className="blogpost-content-view__container">
        <ReactSortable
          className="blog-post-content-view__sortable-container"
          animation={200}
          handle={".handle"}
          group="blog-post-content"
          disabled={!props.editMode}
          list={props.contentPiecesToRender}
          setList={(newOrder) => props.onReorder(newOrder)}
        >
          {props.contentPiecesToRender.map((piece, index) => {
            if (!shouldRenderPiece(piece)) return <></>;
            return (
              <BlogPostContentEditWrapper
                key={piece.id}
                editMode={props.editMode}
                onDeleteRequest={() => props.onDelete(piece)}
              >
                {renderCorrectPieceView(piece, index)}
              </BlogPostContentEditWrapper>
            );
          })}
        </ReactSortable>
        {renderEditTools()}
        {renderNoContentPlaceholder()}
      </div>
    </ContentWrapper>
  );
};

export default BlogPostContentView;
