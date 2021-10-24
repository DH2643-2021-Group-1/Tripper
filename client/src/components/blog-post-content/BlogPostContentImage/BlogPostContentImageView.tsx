import React, { FC } from "react";
import { BlogPostContentImage } from "../../../models/blog-post-content/blog-post-content-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./BlogPostContentImageView.scss";
import CenterContent from "../../center-content/center-content";
import FileDialogWrapperPresenter from "../../FileDialogWrapperPresenter/FileDialogWrapperPresenter";
import Button, { ButtonTypes } from "../../button/button";

interface BlogPostContentImageViewProps {
  editMode: boolean;
  contentPiece: BlogPostContentImage;
  onImageChange: (file: File) => void;
  imageURL: string | null;
}

const BlogPostContentImageView: FC<BlogPostContentImageViewProps> = (props) => {
  const renderImageElement = () => {
    if (props.imageURL == null) return <div>Problem loading the image</div>;

    return (
      <div className="blog-post-content-image-container">
        <img
          className="blog-post-content-image__image"
          src={props.imageURL}
          alt=""
        />
      </div>
    );
  };

  if (!props.editMode) return renderImageElement();

  return (
    <>
      {props.imageURL == null ? (
        <div className="blog-post-content-image__no-image">
          <CenterContent>
            <FileDialogWrapperPresenter
              onFileSelected={props.onImageChange}
              accept="image/png, image/gif, image/jpeg"
            >
              <div>
                <FontAwesomeIcon icon={faUpload} size="3x" />
              </div>
              <br />
              <div>No image chosen</div>
              <br />
              <Button onPress={() => void 0} type={ButtonTypes.onPrimary}>
                Choose Image
              </Button>
            </FileDialogWrapperPresenter>
          </CenterContent>
        </div>
      ) : (
        <div className="blog-post-content-image__image-container">
          <div className="blog-post-content-image__change-file">
            <FileDialogWrapperPresenter
              onFileSelected={props.onImageChange}
              accept="image/png, image/gif, image/jpeg"
            >
              <Button onPress={() => void 0} type={ButtonTypes.onPrimary}>
                Change Image
              </Button>
            </FileDialogWrapperPresenter>
          </div>
          {renderImageElement()}
        </div>
      )}
    </>
  );
};

export default BlogPostContentImageView;
