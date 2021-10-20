import React, { FC } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { BlogPostContentPieceAny } from '../../../models/blog-post-content/blog-post-content';
import BlogPostContentToolboxCard from '../BlogPostContentToolboxCard/BlogPostContentToolboxCard';

import TitleIcon from '@mui/icons-material/TitleRounded';
import TextIcon from '@mui/icons-material/NotesRounded';
import ImageIcon from '@mui/icons-material/ImageRounded';

import './BlogPostContentToolboxView.scss';
import StickyContent from '../../StickyContent/StickyContent';

interface BlogPostContentToolboxViewProps {
    pieces: BlogPostContentPieceAny[],
    onClone: () => void,
}

const BlogPostContentToolboxView: FC<BlogPostContentToolboxViewProps> = (props) => {
    return (
        <StickyContent>
            <div className="blog-post-content-toolbox__container">
                <h3 className="blog-post-content-toolbox__header">Tools</h3>
                <div className="blog-post-content-toolbox__line-split"></div>
                <div>
                    <ReactSortable
                        group={{
                            name: "blog-post-content",
                            put: false,
                            pull: "clone"
                        }}
                        onClone={() => {
                            props.onClone();
                        }}
                        list={props.pieces}
                        setList={() => void 0}
                        sort={false}>
                            <BlogPostContentToolboxCard icon={<TitleIcon fontSize="small" />} text="Title"/>
                            <BlogPostContentToolboxCard icon={<TextIcon fontSize="small" />} text="Paragraph"/>
                            <BlogPostContentToolboxCard icon={<ImageIcon fontSize="small" />} text="Image"/>
                    </ReactSortable>
                </div>
            </div>
        </StickyContent>
    )
}

export default BlogPostContentToolboxView;