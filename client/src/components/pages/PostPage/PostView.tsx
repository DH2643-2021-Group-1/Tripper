import React, { FC } from "react";
import "./PostPage.scss";
import Input from "../../input/input";
import ImageInput from "../../imageInput/ImageInput";
import Button, { ButtonTypes } from "../../button/button";
import LoadingIndicator from "../../loading-indicator/loading-indicator";
import ContentWrapper, {
  ContentWrapperSize,
} from "../../content-wrapper/content-wrapper";
import BlogPostContentPresenter from "../../blog-post-content/BlogPostContent/BlogPostContentPresenter";
import { BlogPostContent } from "../../../models/blog-post-content/blog-post-content";
import CenterContent from "../../center-content/center-content";
import StatusModal, { StatusModalType } from "../../StatusModal/StatusModal";
import TimerCountdown from "../../TimerCountdown/TimerCountdown";

interface PostViewProps {
  onContentChange: (updatedContent: BlogPostContent) => void;
  onTitleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => void;
  onDescriptionChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => void;
  onImageChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  title: string;
  description: string;
  imageUrl: string;
  content: BlogPostContent;
  isLoading: boolean;
  requireTitle: boolean;
  requireDescription: boolean;
  requireImage: boolean;
  allFieldsOK: boolean;
  requireContentPieces: boolean; // TODO modal on true w msg: "must have at least one element"
  imageOpacity?: number;
  onImageHover: Function;
  onImageRemove: () => void;
  uploadStatus: {
    error: string | null;
    success: boolean;
  } | null;
  editMode: boolean;
  onNavigateToBlogPage: () => void;
}

const PostView: FC<PostViewProps> = (props) => {
  const renderUploadStatus = () => {
    if (props.uploadStatus == null) return <></>;
    if (props.uploadStatus.error == null) {
      return (
        <StatusModal
          title={`Blog post successfully ${
            props.editMode ? "updated" : "created"
          }`}
          type={StatusModalType.success}
        >
          <TimerCountdown
            seconds={3}
            onCountdownReached={() => {
              props.onNavigateToBlogPage();
            }}
            render={(timeLeft) => {
              return (
                <div>
                  Navigating you to the blog post in <b>{timeLeft}</b> seconds
                </div>
              );
            }}
          />
        </StatusModal>
      );
    }
    return (
      <StatusModal
        title={`Blog post could not be ${
          props.editMode ? "updated" : "created"
        }`}
        type={StatusModalType.error}
      >
        {props.uploadStatus.error}
      </StatusModal>
    );
  };

  return (
    <div className="flexbox">
      <ContentWrapper size={ContentWrapperSize.medium}>
        <p
          className={["post-page__heading", "post-page__center-text"].join(" ")}
        >
          {props.editMode ? "Edit blog post" : "Create new blog post"}
        </p>
        <span className={"post-page__heading"}>Title</span>
        <Input
          isMissing={props.requireTitle}
          name={"blog-post-title"}
          multiLine={false}
          value={props.title}
          onChange={props.onTitleChange}
        />

        <br />
        <span className={"post-page__heading"}>Description</span>
        <Input
          isMissing={props.requireDescription}
          name={"blogpost title input form"}
          multiLine={true}
          value={props.description}
          onChange={props.onDescriptionChange}
        />

        <br />
        <ImageInput
          isMissing={props.requireImage}
          onImageRemove={props.onImageRemove}
          onHover={props.onImageHover}
          opacity={props.imageOpacity}
          imageUrl={props.imageUrl}
          uploaded={props.imageUrl.length > 0}
          onImageChange={props.onImageChange}
        />

        <br />
        <hr />
        <br />
      </ContentWrapper>
      <BlogPostContentPresenter
        content={props.content}
        editMode={true}
        onContentEdited={props.onContentChange}
      />

      <ContentWrapper>
        {props.requireContentPieces ? (
          <>
            <br />
            <StatusModal
              title={`The blog post content can not be empty`}
              type={StatusModalType.warning}
            >
              Add content by dragging the boxes in the tools in the the box
              above.
            </StatusModal>
          </>
        ) : (
          <></>
        )}
      </ContentWrapper>

      <ContentWrapper>
        <br />
        <hr />
        <br />
        <CenterContent>{props.isLoading && <LoadingIndicator />}</CenterContent>
        <Button
          disabled={
            !props.allFieldsOK || (props.uploadStatus?.success ?? false)
          }
          propagatePressOnDisabled={true}
          type={ButtonTypes.primary}
          onPress={props.onSubmit}
        >
          {props.editMode ? "Save" : "Post"}
        </Button>
        <br />
        <br />
        {renderUploadStatus()}
      </ContentWrapper>
    </div>
  );
};

export default PostView;
