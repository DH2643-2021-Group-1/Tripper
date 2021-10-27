import React, { FC, useEffect, useState } from "react";
import { BlogPostContentImage } from "../../../models/blog-post-content/blog-post-content-image";
import BlogPostContentImageView from "./BlogPostContentImageView";

interface BlogPostContentImagePresenterProps {
  editMode: boolean;
  piece: BlogPostContentImage;
  onPieceUpdate: (piece: BlogPostContentImage) => void;
}

const BlogPostContentImagePresenter: FC<BlogPostContentImagePresenterProps> = (
  props,
) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setImage(getImageURL());
  }, [props.piece.file, props.piece.imageUrl]);

  const handleNewImageSelect = (file: File) => {
    props.onPieceUpdate({
      ...props.piece,
      file: file,
    });
  };

  const getImageURL = () => {
    if (props.piece.file) return URL.createObjectURL(props.piece.file);
    if (props.piece.imageUrl) return props.piece.imageUrl;
    return null;
  };

  return (
    <BlogPostContentImageView
      editMode={props.editMode}
      imageURL={image}
      onImageChange={handleNewImageSelect}
      contentPiece={props.piece}
    />
  );
};

export default BlogPostContentImagePresenter;
