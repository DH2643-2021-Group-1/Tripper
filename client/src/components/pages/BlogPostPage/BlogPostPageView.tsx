import moment from "moment";
import React, { FC, useState } from "react";
import BlogPostMetaCard from "../../blog-post-meta-card/blog-post-meta-card";
import ContentWrapper from "../../content-wrapper/content-wrapper";
import ProfilePicture from "../../profile-picture/profile-picture";
import { BlogPost } from "../../../models/blog-post";

import EventNoteIcon from "@mui/icons-material/EventNoteRounded";
import HourglassTopIcon from "@mui/icons-material/HourglassTopRounded";
import BlogPostContentPresenter from "../../blog-post-content/BlogPostContent/BlogPostContentPresenter";

import "./BlogPostPageView.scss";
import Button, { ButtonTypes } from "../../button/button";
import { Link } from "react-router-dom";

interface BlogPostPageViewProps {
  readingSpeed: number;
  isOwner: boolean;
  deleteLoading: boolean;
  blogPost: BlogPost;
  onDelete: () => void;
  onEdit: () => void;
}

const BlogPostPageView: FC<BlogPostPageViewProps> = (props) => {
  return (
    <div className="blog-post-page__container">
      <div className="blog-post-page__loaded-container">
        <div
          className="blog-post-page__image-header"
          style={{ backgroundImage: `url(${props.blogPost.primaryImage})` }}
        >
          <div className="blog-post-page__title-container">
            <ContentWrapper>
              <h1 className="blog-post-page__title">{props.blogPost.title}</h1>
            </ContentWrapper>
          </div>
        </div>
        <div className="blog-post-page__meta-data-container">
          <ContentWrapper>
            <div className="blog-post-page__meta-data__cards">
              <BlogPostMetaCard
                leading={
                  <ProfilePicture
                    size="30px"
                    profilePictureSrc={props.blogPost.author.profilePicture}
                  />
                }
                subtitle="Author"
                title={props.blogPost.author.displayName}
              />
              <BlogPostMetaCard
                leading={<EventNoteIcon />}
                subtitle="Date Posted"
                title={moment(props.blogPost.publicationDate).format(
                  "DD-MM-YYYY",
                )}
              />
              <BlogPostMetaCard
                leading={<HourglassTopIcon />}
                subtitle="Average Read Time"
                title={props.readingSpeed + " minutes"}
              />
            </div>
          </ContentWrapper>
        </div>
        {props.isOwner ? (
          <div className="blog-post-page__edit-delete-container">
            <ContentWrapper>
              <hr />
              <h2>
                <i>Admin Settings</i>
              </h2>
              <div className="blog-post-page__edit-delete-buttons">
                <Button onPress={props.onEdit}>Edit</Button>
                <Button
                  isLoading={props.deleteLoading}
                  type={ButtonTypes.danger}
                  onPress={props.onDelete}
                >
                  Delete
                </Button>
              </div>
              <hr />
            </ContentWrapper>
          </div>
        ) : (
          <></>
        )}
        <div className="blog-post-page__text-content-container">
          <BlogPostContentPresenter
            content={props.blogPost.content}
            onContentEdited={() => void 0}
            editMode={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPageView;
