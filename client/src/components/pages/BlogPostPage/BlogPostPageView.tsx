import moment from 'moment';
import React, { FC, useState } from 'react';
import BlogPostMetaCard from '../../blog-post-meta-card/blog-post-meta-card';
import ContentWrapper from '../../content-wrapper/content-wrapper';
import ProfilePicture from '../../profile-picture/profile-picture';
import { BlogPost } from '../../../models/blog-post';

import EventNoteIcon from '@mui/icons-material/EventNoteRounded';
import HourglassTopIcon from '@mui/icons-material/HourglassTopRounded';

import './BlogPostPageView.scss';
import BlogPostContentPresenter from '../../blog-post-content/BlogPostContent/BlogPostContentPresenter';
import { BlogPostContent } from '../../../models/blog-post-content/blog-post-content';
import { EditType } from '../../../models/blog-post-content/blog-post-content-piece';

interface BlogPostPageViewProps {
    blogPost: BlogPost,
}

const BlogPostPageView: FC<BlogPostPageViewProps> = (props) => {

    const [blogPostContentDummy, setBlogPostContentDummy] = useState<BlogPostContent>(
        {
            contentPieces: [
                // {
                //     editType: EditType.none,
                //     id: "000",
                //     type: "title",
                //     title: "My Adventure Around Norway"
                // },
                // {
                //     editType: EditType.none,
                //     id: "001",
                //     type: "paragraph",
                //     text: "I counted myself very fortunate, partly, I was very hardworking, and partly, it’s the timing. The organization was growing, and they need new leaders. Timing and opportunity are important. One has to do the right thing, and the right place, and the right time."
                // },
                // {
                //     editType: EditType.none,
                //     id: "002",
                //     type: "paragraph",
                //     text: "Besides, my immediate superior was the director himself. He was there to set up the new department, and I seized every opportunity to contribute to the growing need. While my primary responsibility was just software development, I took up the challenge to set up the new build process and make it work. It’s DevOps work, but I saw no boundary."
                // },
                // {
                //     editType: EditType.none,
                //     id: "003",
                //     type: "image",
                //     imageUrl: "https://cdn.pixabay.com/photo/2021/09/20/21/32/lake-6641880__340.jpg",
                //     file: null,
                // },
                // {
                //     editType: EditType.none,
                //     id: "004",
                //     type: "title",
                //     title: "My Tips For Next Time"
                // },
                // {
                //     editType: EditType.none,
                //     id: "005",
                //     type: "paragraph",
                //     text: "I’m getting further and further away from the progress of software development in pursuing my career in the organization. My actual passion is actual software technology, but I focus on what the company need than my passion. I failed to invest in myself to develop my actual passion."
                // },
                // {
                //     editType: EditType.none,
                //     id: "006",
                //     type: "image",
                //     imageUrl: null,
                //     file: null,
                // },
            ]
        }
    )

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
                    <BlogPostContentPresenter
                        content={blogPostContentDummy}
                        editMode={true}
                        onContentEdited={(content) => {
                            setBlogPostContentDummy(content);
                            console.log(content)
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default BlogPostPageView;
