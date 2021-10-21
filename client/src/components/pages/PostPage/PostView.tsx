import React from "react";
import "./PostPage.scss";
import Input from "../../input/input"
import ImageInput from "../../imageInput/ImageInput";
import Button, { ButtonTypes } from "../../button/button"
import LoadingIndicator from "../../loading-indicator/loading-indicator"
import ContentWrapper from "../../content-wrapper/content-wrapper";
import BlogPostContentPresenter from "../../blog-post-content/BlogPostContent/BlogPostContentPresenter";
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";


interface Props {
  onContentChange: (updatedContent: BlogPostContent) => void,
  onHeadingChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onTextChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onImageChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onSubmit: () => void,
  formValue: string,
  formHeader: string,
  isLoading: boolean,
  preview: string,
  content: BlogPostContent
}

const PostView = ({ onContentChange, onHeadingChange, onTextChange, onImageChange, onSubmit, formValue, formHeader, isLoading, preview, content }: Props) => {
  return <div className="flexbox">
    <ContentWrapper>
      <p>Create new blog post</p>
      <span>Title</span>
      <Input name={"blogpost input form"} multiLine={false} value={formValue} onChange={onTextChange} />
      <span>Description</span>
      <Input name={"blogpost title input form"} multiLine={true} value={formHeader} onChange={onHeadingChange} />
      {isLoading && <LoadingIndicator />}
      {preview && <img className="preview" src={preview} alt="preview image" />}
      <ImageInput onImageChange={onImageChange} />
      <hr />
      <br />
    </ContentWrapper>
    <BlogPostContentPresenter
        content={content}
        editMode={true}
        onContentEdited={onContentChange}/>
    <ContentWrapper>
      <br />
      <hr />
      <br />
      <Button
          disabled={false}
          type={ButtonTypes.primary}
          onPress={onSubmit}>
            Post
      </Button>
    </ContentWrapper>
  </div>;
};

export default PostView;
