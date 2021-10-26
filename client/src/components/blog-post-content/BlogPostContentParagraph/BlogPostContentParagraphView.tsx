import React, { FC } from "react";
import { BlogPostContentParagraph } from "../../../models/blog-post-content/blog-post-content-paragraph";
import PureInput from "../../PureInput/PureInput";
import "./BlogPostContentParagraphView.scss";

interface BlogPostContentParagraphViewProps {
  editMode: boolean;
  piece: BlogPostContentParagraph;
  onEditText: (newText: string) => void;
}

const BlogPostContentParagraphView: FC<BlogPostContentParagraphViewProps> = (
  props
) => {
  return (
    <p className="blog-post-content-paragraph">
      {props.editMode ? (
        <PureInput text={props.piece.text} onEditText={props.onEditText} />
      ) : (
        props.piece.text
      )}
    </p>
  );
};

export default BlogPostContentParagraphView;
