import React, { FC } from "react";
import { BlogPostContentParagraph } from "../../../models/blog-post-content/blog-post-content-paragraph";
import PureInput from "../../PureInput/PureInput";
import BlogPostContentParagraphView from "./BlogPostContentParagraphView";

interface BlogPostContentParagraphPresenterProps {
  editMode: boolean;
  piece: BlogPostContentParagraph;
  onPieceUpdate: (piece: BlogPostContentParagraph) => void;
}

const BlogPostContentParagraphPresenter: FC<BlogPostContentParagraphPresenterProps> =
  (props) => {
    return (
      <BlogPostContentParagraphView
        editMode={props.editMode}
        piece={props.piece}
        onEditText={(newText) => {
          props.onPieceUpdate({
            ...props.piece,
            text: newText,
          });
        }}
      />
    );
  };

export default BlogPostContentParagraphPresenter;
