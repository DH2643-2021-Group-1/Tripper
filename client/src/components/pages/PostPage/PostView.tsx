import React from "react";
import "./PostPage.scss";
import Input from "../../input/input"
import Button, { ButtonTypes } from "../../button/button"
import LoadingIndicator from "../../loading-indicator/loading-indicator"




interface Props {
  onHeadingChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void,
  formValue: string,
  formHeader: string,
  isLoading: boolean
}

const PostView = ({ onHeadingChange, onTextChange, onImageChange, onSubmit, formValue, formHeader, isLoading }: Props) => {
  return <div style={{ border: "2px solid red" }}>
    <Input name={"blogpost input form"} value={formValue} onChange={onTextChange} />
    <Input name={"blogpost title input form"} value={formHeader} onChange={onHeadingChange} />
    {isLoading && <LoadingIndicator />}
    <Button
      disabled={false}
      type={ButtonTypes.primary}
      onPress={onSubmit}
    >
      Post
    </Button>

    <div style={{ border: "2px solid blue" }}>
      <div style={{ border: "1px solid green" }}>
        <label htmlFor='single'>
          Single img form
        </label>
        <input type='file' id='single' onChange={onImageChange} />
      </div>
    </div>
    <div style={{ border: "2px solid blue" }}>
      <div style={{ border: "1px solid green" }}>
        <label htmlFor='multi'>
          Multiple img form
        </label>
        <input type='file' id='multi' onChange={onImageChange} multiple />
      </div>
    </div>

  </div>;
};

export default PostView;
