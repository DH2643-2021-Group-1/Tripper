import React, { FC } from "react";
import { BlogPostContentTitle } from "../../../models/blog-post-content/blog-post-content-title";
import PureInput from "../../PureInput/PureInput";
import "./BlogPostContentTitleView.scss";

interface BlogPostContentTitleViewProps {
  editMode: boolean;
  piece: BlogPostContentTitle;
  onEditText: (newText: string) => void;
}

const BlogPostContentTitleView: FC<BlogPostContentTitleViewProps> = (props) => {
  return (
    <h2>
      {props.editMode ? (
        <PureInput text={props.piece.title} onEditText={props.onEditText} />
      ) : (
        props.piece.title
      )}
    </h2>
  );
};

export default BlogPostContentTitleView;
