import React, { FC } from 'react';
import { BlogPostContentTitle } from '../../../models/blog-post-content/blog-post-content-title';
import './BlogPostContentTitleView.scss'

interface BlogPostContentTitleViewProps {
    piece: BlogPostContentTitle
}

const BlogPostContentTitleView: FC<BlogPostContentTitleViewProps> = (props) => {
    return (
        <h2>{ props.piece.title }</h2>
    )
}

export default BlogPostContentTitleView;