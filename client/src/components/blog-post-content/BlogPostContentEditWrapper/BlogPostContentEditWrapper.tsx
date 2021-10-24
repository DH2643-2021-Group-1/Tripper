import React, { FC, useState } from "react";
import "./BlogPostContentEditWrapper.scss";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import DeleteIcon from "@mui/icons-material/Delete";

interface BlogPostContentEditWrapperProps {
  editMode: boolean;
  onDeleteRequest: () => void;
}

const BlogPostContentEditWrapper: FC<BlogPostContentEditWrapperProps> = (
  props,
) => {
  const [isDeleted, setIsDeletePressed] = useState<boolean>(false);

  const onDeletePressed = () => {
    setIsDeletePressed(true);
    setTimeout(() => props.onDeleteRequest(), 1000);
  };

  if (!props.editMode) return <>{props.children}</>;

  return (
    <div
      className={
        "blog-post-content-edit-wrapper__container " +
        (isDeleted ? " blog-post-content-edit-wrapper__container--deleted" : "")
      }
    >
      <div className="blog-post-content-edit-wrapper__action-container">
        <div className="blog-post-content-edit-wrapper__action-buttons">
          <div
            onClick={onDeletePressed}
            className="blog-post-content-edit-wrapper__delete"
          >
            <DeleteIcon fontSize={"small"} />
          </div>
          <div className="blog-post-content-edit-wrapper__move handle">
            <DragIndicatorRoundedIcon fontSize={"small"} />
          </div>
        </div>
      </div>
      <div className="blog-post-content-edit-wrapper__content-container">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default BlogPostContentEditWrapper;
