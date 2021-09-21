import moment from 'moment';
import React, { FC } from 'react';
import { BlogPost } from '../../models/blog-post';
import Card from '../card/card';
import ProfilePicture from '../profile-picture/profile-picture';
import './blog-post-card.scss';

interface BlogPostCardProps {
    data: BlogPost,
}

const BlogPostCard: FC<BlogPostCardProps> = (props) => {

    const createShortDescription = () => {
        const maxNumberOfLetters = 75;
        if (props.data.description.length < maxNumberOfLetters) return props.data.description;
        return props.data.description.substring(0, maxNumberOfLetters) + "...";
    }

    return (
        <Card>
            <div className="blog-post-card__container">
                <div
                    style={{backgroundImage: `url(${ props.data.primaryImage })`}} 
                    className="blog-post-card__background-image"></div>
                <div className="blog-post-card__text-container">
                    <div className="blog-post-card__author-container">
                        <ProfilePicture profilePictureSrc={props.data.author.profilePicture}></ProfilePicture>
                        <div>
                            -
                        </div>
                        <div>
                            <i>{ props.data.author.firstName + " " + props.data.author.lastName }</i>
                        </div>
                    </div>
                    <h3 className="blog-post-card__title">
                        { props.data.title }
                    </h3>
                    <div className="blog-post-card__description">
                        { createShortDescription() }
                    </div>
                    <div className="blog-post-card__date">
                        <i>{ moment(props.data.publicationDate).format("DD-MM-YYYY") }</i>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default BlogPostCard;