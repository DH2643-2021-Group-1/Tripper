import React from "react";
import "./PostPage.scss";
import Input from "../../input/input"

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: Function,
  formValue: string
}

const PostView = ({ onChange, onSubmit, formValue }: Props) => {
  return <div style={{ border: "2px solid red" }}>
    <Input name={"hello"} value={formValue} onChange={onChange} />
  </div>;
};

export default PostView;
