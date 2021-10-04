import moment from 'moment';
import React, { FC } from 'react';
import BlogPostMetaCard from '../../components/blog-post-meta-card/blog-post-meta-card';
import BlogRichText from '../../components/blog-rich-text/blog-rich-text';
import ContentWrapper from '../../components/content-wrapper/content-wrapper';
import ProfilePicture from '../../components/profile-picture/profile-picture';
import { BlogPost } from '../../models/blog-post';

import EventNoteIcon from '@mui/icons-material/EventNoteRounded';
import HourglassTopIcon from '@mui/icons-material/HourglassTopRounded';

import './blog-post-page-presenter.scss';

interface BlogPostPagePresenterProps {
    blogPost: BlogPost,
}

const BlogPostPagePresenter: FC<BlogPostPagePresenterProps> = (props) => {

    return (
        <div className="blog-post-page__container">
            <div className="blog-post-page__loaded-container">
                <div
                    className="blog-post-page__image-header"
                    style={{ backgroundImage: `url(${props.blogPost.primaryImage})` }}>
                    <div className="blog-post-page__title-container">
                        <ContentWrapper>
                            <h1 className="blog-post-page__title">
                                {props.blogPost.title}
                            </h1>
                        </ContentWrapper>
                    </div>
                </div>
                <div className="blog-post-page__meta-data-container">
                    <ContentWrapper>
                        <div className="blog-post-page__meta-data__cards">
                            <BlogPostMetaCard 
                                leading={
                                    <ProfilePicture
                                        size="30px" 
                                        profilePictureSrc={ props.blogPost.author.profilePicture } />
                                }
                                subtitle="Author"
                                title={props.blogPost.author.firstName + " " + props.blogPost.author.lastName}/>
                            <BlogPostMetaCard 
                                leading={<EventNoteIcon/>}
                                subtitle="Date Posted"
                                title={
                                    moment(props.blogPost.publicationDate).format("DD-MM-YYYY") 
                                }/>
                            <BlogPostMetaCard 
                                leading={<HourglassTopIcon/>}
                                subtitle="Average Read Time"
                                title={"12 minutes"}/>
                        </div>
                    </ContentWrapper>
                </div>
                <div className="blog-post-page__text-content-container">
                    <BlogRichText html={props.blogPost.content}></BlogRichText>
                </div>
            </div>
        </div>
    )
}

export default BlogPostPagePresenter;
