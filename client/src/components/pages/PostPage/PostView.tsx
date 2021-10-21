import React from "react";
import "./PostPage.scss";
import Input from "../../input/input"
import ImageInput from "../../imageInput/ImageInput";
import Button, { ButtonTypes } from "../../button/button"
import LoadingIndicator from "../../loading-indicator/loading-indicator"


interface Props {
  onHeadingChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onTextChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onImageChange: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void,
  onSubmit: () => void,
  formValue: string,
  formHeader: string,
  isLoading: boolean,
  preview: string,
}

const PostView = ({ onHeadingChange, onTextChange, onImageChange, onSubmit, formValue, formHeader, isLoading, preview }: Props) => {
  return <div className="flexbox">
    <span>Create new blog post</span>
    <div className="container">
      <span>Title</span>
      <Input name={"blogpost input form"} multiLine={false} value={formValue} onChange={onTextChange} />
      <span>Description</span>
      <Input name={"blogpost title input form"} multiLine={true} value={formHeader} onChange={onHeadingChange} />
      {isLoading && <LoadingIndicator />}
      {preview && <img className="preview" src={preview} alt="preview image" />}
      <ImageInput onImageChange={onImageChange} />
      <Button
        disabled={false}
        type={ButtonTypes.primary}
        onPress={onSubmit}
      >
        Post
    </Button>
    </div>
  </div>;
};

export default PostView;
