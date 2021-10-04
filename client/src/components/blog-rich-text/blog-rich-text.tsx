import React, { FC } from 'react';
import ContentWrapper from '../content-wrapper/content-wrapper';
import './blog-rich-text.scss';

interface BlogRichTextProps {
    html: string,
}

const BlogRichText: FC<BlogRichTextProps> = (props) => {
    return (
        <ContentWrapper>
            <div 
                className="blog-rich-text__container" 
                dangerouslySetInnerHTML={{ __html: props.html }} ></div>
        </ContentWrapper>
    )
}

export default BlogRichText;