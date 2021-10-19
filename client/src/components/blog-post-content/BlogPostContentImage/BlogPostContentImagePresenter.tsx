import React, { FC, useEffect, useState } from 'react';
import { BlogPostContentImage } from '../../../models/blog-post-content/blog-post-content-image';
import BlogPostContentImageView from './BlogPostContentImageView';

interface BlogPostContentImagePresenterProps {
    piece: BlogPostContentImage,
    onPieceUpdate: (piece: BlogPostContentImage) => void
}

const BlogPostContentImagePresenter: FC<BlogPostContentImagePresenterProps> = (props) => {

    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        console.log("Update image url");
        setImage(getImageURL());
    }, [props.piece.file, props.piece.imageUrl]);

    const handleNewImageSelect = (file: File) => {
        props.onPieceUpdate({
            ...props.piece,
            file: file
        });
    }

    const getImageURL = () => {
        if (props.piece.imageUrl) return props.piece.imageUrl;
        if (props.piece.file) return URL.createObjectURL(props.piece.file);
        return null;
    }

    return (
        <BlogPostContentImageView
            imageURL={image}
            onImageChange={handleNewImageSelect}
            contentPiece={props.piece}/>
    )
}

export default BlogPostContentImagePresenter;