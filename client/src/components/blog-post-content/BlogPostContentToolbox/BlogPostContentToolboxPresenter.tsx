import React, { FC, useState } from "react";
import { EditType } from "../../../models/blog-post-content/blog-post-content-piece";
import { v4 as uuidv4 } from "uuid";
import BlogPostContentToolboxView from "./BlogPostContentToolboxView";
import { BlogPostContentPieceAny } from "../../../models/blog-post-content/blog-post-content";

const BlogPostContentToolboxPresenter: FC = (props) => {
  const generateUniqueContentPieces = (): BlogPostContentPieceAny[] => {
    return [
      {
        id: uuidv4(),
        editType: EditType.new,
        title: "Title",
        type: "title",
      },
      {
        id: uuidv4(),
        editType: EditType.new,
        text: "Paragraph",
        type: "paragraph",
      },
      {
        id: uuidv4(),
        editType: EditType.new,
        file: null,
        imageUrl: null,
        type: "image",
      },
    ];
  };

  const [toolboxContentPieces, setToolboxContentPieces] = useState(
    generateUniqueContentPieces()
  );

  return (
    <BlogPostContentToolboxView
      pieces={toolboxContentPieces}
      onClone={() => {
        setToolboxContentPieces(generateUniqueContentPieces());
      }}
    />
  );
};

export default BlogPostContentToolboxPresenter;
