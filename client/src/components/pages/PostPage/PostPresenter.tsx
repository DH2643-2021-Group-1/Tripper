import React, { useState } from "react";
import PostView from "./PostView";

const PostPresenter = () => {

  const [formValue, setFormValue] = useState("")

  const handleSubmit = () => {
    console.log("handlesubmit place holder")
  }

  const onChange = (e: any) => {
    const input = e.target.value;
    setFormValue(input)
  }


  return <PostView onChange={onChange} onSubmit={handleSubmit} formValue={formValue} />;
};

export default PostPresenter;
