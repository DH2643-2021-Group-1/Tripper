import React, { FC } from 'react';
import BlogRichText from '../../components/blog-rich-text/blog-rich-text';
import CenterContent from '../../components/center-content/center-content';
import { BlogPost } from '../../models/blog-post';
import './blog-post-page-presenter.scss';

interface BlogPostPagePresenterProps {
    blogPost: BlogPost | null,
    loading: boolean,
    couldNotFindArticle: boolean,
}

const BlogPostPagePresenter: FC<BlogPostPagePresenterProps> = (props) => {

    return (
        <div className="blog-post-page__container">
            <div className={"blog-post-page__loader " + (props.loading ? "loading" : "")}>
                <CenterContent>
                    Loading...
                </CenterContent>
            </div>

            {
                props.blogPost === null 
                    ? 
                        <></>
                    : 
                        <div className="blog-post-page__loaded-container">
                            <div className="blog-post-page__image-header">
                                <img src={ props.blogPost.primaryImage } alt="" />
                            </div>
                            <BlogRichText html={props.blogPost.content}></BlogRichText>
                        </div>
            }
        </div>
    )
}

export default BlogPostPagePresenter;
