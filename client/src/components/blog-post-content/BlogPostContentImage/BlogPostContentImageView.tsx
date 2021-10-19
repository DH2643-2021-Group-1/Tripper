import React, { FC } from 'react';
import { BlogPostContentImage } from '../../../models/blog-post-content/blog-post-content-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import './BlogPostContentImageView.scss';
import CenterContent from '../../center-content/center-content';
import FileDialogWrapperPresenter from '../../FileDialogWrapperPresenter/FileDialogWrapperPresenter';

interface BlogPostContentImageViewProps {
    contentPiece: BlogPostContentImage,
    onImageChange: (file: File) => void,
    imageURL: string | null,
}

const BlogPostContentImageView: FC<BlogPostContentImageViewProps> = (props) => {

    return (
        <div className="blog-post-content-image-container">
            {
                props.imageURL == null
                    ?
                        <div className="blog-post-content-image__no-image">
                            <CenterContent>
                                <FileDialogWrapperPresenter onFileSelected={props.onImageChange} accept="image/png, image/gif, image/jpeg"> 
                                    <div>
                                        <FontAwesomeIcon icon={faUpload} size="3x" />
                                    </div>
                                    <div>
                                        No image chosen
                                    </div>
                                </FileDialogWrapperPresenter> 
                            </CenterContent>
                        </div>
                    :
                        <img
                            className="blog-post-content-image__image"  
                            src={props.imageURL} alt="" />
            }
        </div>
    )
}

export default BlogPostContentImageView;