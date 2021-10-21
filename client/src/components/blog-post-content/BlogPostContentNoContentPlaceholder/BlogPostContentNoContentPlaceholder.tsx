import React, { FC } from 'react';
import CenterContent from '../../center-content/center-content';
import './BlogPostContentNoContentPlaceholder.scss';


const BlogPostContentNoContentPlaceholder: FC = (props) => {
    return (
        <div className="blog-post-content-no-content-placeholder__container">
            <CenterContent>
                Start building you blog post!<br/>
                Drag elements into this box from the tools.
            </CenterContent>
        </div>
    )
}

export default BlogPostContentNoContentPlaceholder;