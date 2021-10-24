import React from "react";
import "./imageInput.scss";
import upload from "../../resources/images/upload.png";

interface Props {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ onImageChange }: Props) => {
  return (
    <div>
      <div>
        <label htmlFor="single">
          <img className="imageContainer" src={upload} alt="upload image" />
        </label>
        <input
          className="hide"
          type="file"
          id="single"
          onChange={onImageChange}
        />
      </div>
    </div>
  );
};

export default ImageInput;
