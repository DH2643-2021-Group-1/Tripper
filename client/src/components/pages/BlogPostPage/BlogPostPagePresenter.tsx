import React, { FC, useEffect, useState } from 'react';
import PageLoadingIndicator from '../../page-loading-indicator/page-loading-indicator';
import { BlogPost } from '../../../models/blog-post';
import BlogPostPageView from './BlogPostPageView';
import { useParams } from 'react-router-dom';
import { useGetBlogPostByPostId } from '../../../hooks/useBlogPostApi';

interface BlogPostPagePresenterParamTypes {
    id: string
  }

const BlogPostPagePresenter: FC = (props) => {

    // TODO: We should get the correct ID from the url
    const params = useParams<BlogPostPagePresenterParamTypes>();
    const blogPostId = params.id;

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [isFetchingBlogPost, setIsFetchingBlogPost] = useState<boolean>(true);

    useEffect(() => {
        setIsFetchingBlogPost(true);
        useGetBlogPostByPostId(blogPostId).then((fetchedBlogPost: BlogPost[]) => {
            console.log(fetchedBlogPost[0]);
            setBlogPost(fetchedBlogPost[0]);
            setIsFetchingBlogPost(false);
        });
    }, [blogPostId]);

    const render = () => {
        if (isFetchingBlogPost) {
            return <PageLoadingIndicator/>
        }
        if (blogPost != null) {
            return <BlogPostPageView blogPost={blogPost}/>
        }
        return <div>Blog post do not exist</div>
    }

    return ( render() )
}

export default BlogPostPagePresenter;
