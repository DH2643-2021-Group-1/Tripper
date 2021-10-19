import React, { FC } from 'react';
import { BlogPostContentParagraph } from '../../../models/blog-post-content/blog-post-content-paragraph';
import './BlogPostContentParagraphView.scss'

interface BlogPostContentParagraphViewProps {
    piece: BlogPostContentParagraph
}

const BlogPostContentParagraphView: FC<BlogPostContentParagraphViewProps> = (props) => {
    return (
        <p className="blog-post-content-paragraph">
            { props.piece.text }
        </p>
    )
}

export default BlogPostContentParagraphView;