import React, { FC } from "react";
import IconCard from "../icon-card/icon-card";
import "./blog-post-meta-card.scss";

interface BlogPostMetaCardProps {
  leading: React.ReactNode;
  subtitle: string;
  title: string;
}

const BlogPostMetaCard: FC<BlogPostMetaCardProps> = (props) => {
  return (
    <IconCard leading={props.leading}>
      <div className="blog-post-meta-card__subtitle">{props.subtitle}</div>
      <div className="blog-post-meta-card__title">{props.title}</div>
    </IconCard>
  );
};

export default BlogPostMetaCard;
