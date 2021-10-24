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
import StatusModal, { StatusModalType } from "../../StatusModal/StatusModal";
import TimerCountdown from "../../TimerCountdown/TimerCountdown";


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
  uploadStatus: {
    error: string | null,
    success: boolean,
  } | null,
  editMode: boolean,
  onNavigateToBlogPage: () => void
}

const PostView: FC<PostViewProps> = (props) => {
  const renderUploadStatus = () => {
    if (props.uploadStatus == null) return <></>;
    if (props.uploadStatus.error == null) {
      return <StatusModal 
        title={`Blog post successfully ${props.editMode ? "updated" : "created"}`} 
        type={StatusModalType.success}>
          <TimerCountdown seconds={3} onCountdownReached={() => {
            props.onNavigateToBlogPage();
          }} render={timeLeft => {
            return <div>Navigating you to the blog post in <b>{timeLeft}</b> seconds</div> 
          }}/>
      </StatusModal>
    }
    return <StatusModal 
      title={`Blog post could not be ${props.editMode ? "updated" : "created"}`} 
      type={StatusModalType.error}>
        {props.uploadStatus.error}
    </StatusModal>
  }

  return <div className="flexbox">
    <ContentWrapper>
      <p>Create new blog post</p>
      
      <span>Title</span>
      <Input 
        name={"blog-post-title"} 
        multiLine={false} 
        value={props.title} 
        onChange={props.onTitleChange} />

      <span>Description</span>
      <Input 
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
        onContentEdited={props.onContentChange}/>
    <ContentWrapper>
      <br />
      <hr />
      <br />
      <CenterContent>
        { props.isLoading && <LoadingIndicator /> }
      </CenterContent>
      <Button
          disabled={props.uploadStatus?.success ?? false}
          type={ButtonTypes.primary}
          onPress={props.onSubmit}>
            Post
      </Button>
      <br/><br/>
      {
        renderUploadStatus()
      }
    </ContentWrapper>
  </div>;
};

export default PostView;
