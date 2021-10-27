import React, { FC } from "react";
import { BlogPostContentTitle } from "../../../models/blog-post-content/blog-post-content-title";
import BlogPostContentTitleView from "./BlogPostContentTitleView";

interface BlogPostContentTitlePresenterProps {
  editMode: boolean;
  piece: BlogPostContentTitle;
  onPieceUpdate: (piece: BlogPostContentTitle) => void;
}

const BlogPostContentTitlePresenter: FC<BlogPostContentTitlePresenterProps> = (
  props,
) => {
  return (
    <BlogPostContentTitleView
      editMode={props.editMode}
      piece={props.piece}
      onEditText={(newText) => {
        props.onPieceUpdate({
          ...props.piece,
          title: newText,
        });
      }}
    />
  );
};

export default BlogPostContentTitlePresenter;
