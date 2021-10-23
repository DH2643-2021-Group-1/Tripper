import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faClose } from "@fortawesome/free-solid-svg-icons";
import "./imageInput.scss"


interface Props {
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onHover: Function,
    uploaded?: boolean,
    imageUrl?: string,
    opacity?: number,
    onImageRemove: () => void,
}

const ImageInput = ({ onImageChange, onHover, uploaded, imageUrl, opacity, onImageRemove }: Props) => {


    return (

        !uploaded ? (
            <div className={"image-input__image-uploader-container"}>
                <div className={""}>
                    <label htmlFor='single'>
                        <FontAwesomeIcon size="4x"
                            icon={faUpload}
                            className={"image-input__image-uploader-icon"}
                            opacity={1}
                        />
                    </label>
                </div>
                <input className="image-input__hide-image" type='file' id='single' onChange={onImageChange} />
            </div>
        ) : (
                <div
                    onMouseOver={() => onHover()}
                    onMouseOut={() => onHover()}
                    className={"image-input__image-uploader-container"}>
                    <div onClick={onImageRemove} className="image-input__remove-container">
                        <label htmlFor='single' >
                            <FontAwesomeIcon size="4x"
                                icon={faClose}
                                className={"image-input__close-icon"}
                                opacity={opacity}
                            />
                        </label>
                    </div>
                    {imageUrl && <img className="image-input__preview-image" src={imageUrl} alt="preview image" />}
                </div>

            )
    )
}

ImageInput.defaultProps = {
    opacity: 1,
}


export default ImageInput
