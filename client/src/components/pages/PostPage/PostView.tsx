import React, { FC } from "react";
import "./PostPage.scss";
import Input from "../../input/input"
import ImageInput from "../../imageInput/ImageInput";
import Button, { ButtonTypes } from "../../button/button"
import LoadingIndicator from "../../loading-indicator/loading-indicator"
import ContentWrapper from "../../content-wrapper/content-wrapper";
import BlogPostContentPresenter from "../../blog-post-content/BlogPostContent/BlogPostContentPresenter";
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";
import CenterContent from "../../center-content/center-content";


interface PostViewProps {
  onContentChange: (updatedContent: BlogPostContent) => void,
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onImageChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onSubmit: () => void,
  title: string,
  description: string,
  imageUrl: string,
  content: BlogPostContent
  isLoading: boolean,
  requireTitle: boolean,
  requireDescription: boolean,
}

const PostView: FC<PostViewProps> = (props) => {
  return <div className="flexbox">
    <ContentWrapper>
      <p>Create new blog post</p>

      <span>Title</span>
      <Input
        isMissing={props.requireTitle}
        name={"blog-post-title"}
        multiLine={false}
        value={props.title}
        onChange={props.onTitleChange} />

      <span>Description</span>
      <Input
        isMissing={props.requireDescription}
        name={"blogpost title input form"}
        multiLine={true}
        value={props.description}
        onChange={props.onDescriptionChange} />

      {props.imageUrl && <img className="preview" src={props.imageUrl} alt="preview image" />}
      <ImageInput onImageChange={props.onImageChange} />

      <hr />
      <br />
    </ContentWrapper>
    <BlogPostContentPresenter
      content={props.content}
      editMode={true}
      onContentEdited={props.onContentChange} />
    <ContentWrapper>
      <br />
      <hr />
      <br />
      <CenterContent>
        {props.isLoading && <LoadingIndicator />}
      </CenterContent>
      <Button
        disabled={false}
        type={ButtonTypes.primary}
        onPress={props.onSubmit}>
        Post
      </Button>
    </ContentWrapper>
  </div>;
};

export default PostView;
