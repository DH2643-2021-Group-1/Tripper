import React, { FC, ReactNode } from "react";
import Card from "../../card/card";
import "./BlogPostContentToolboxCard.scss";

import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";

interface BlogPostContentToolboxCardProps {
  text: string;
  icon: ReactNode;
}

const BlogPostContentToolboxCard: FC<BlogPostContentToolboxCardProps> = (
  props,
) => {
  return (
    <Card className="blog-post-content-toolbox-card__container">
      <div className="blog-post-content-toolbox-card__drag-icon">
        <DragIndicatorRoundedIcon fontSize={"small"} />
      </div>
      <div className="blog-post-content-toolbox-card__line-split"></div>
      <div>{props.text}</div>
      <div className="blog-post-content-toolbox-card__type-icon">
        {props.icon}
      </div>
    </Card>
  );
};

export default BlogPostContentToolboxCard;
