import React, { FC, useEffect, useState } from 'react';
import PageLoadingIndicator from '../../page-loading-indicator/page-loading-indicator';
import { BlogPost } from '../../../models/blog-post';
import BlogPostPageView from './BlogPostPageView';
import { useHistory, useParams } from 'react-router-dom';
import { useDeleteBlogPostByPostId, useGetBlogPostByPostId } from '../../../hooks/useBlogPostApi';
import { calculateReadTimeInMinutes } from '../../../helpers/blog-post-read-time';

interface BlogPostPagePresenterParamTypes {
    id: string
  }

const BlogPostPagePresenter: FC = (props) => {

    const params = useParams<BlogPostPagePresenterParamTypes>();
    const blogPostId = params.id;

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [isFetchingBlogPost, setIsFetchingBlogPost] = useState<boolean>(true);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);

    const history = useHistory();
    
    const checkIfOwner = () => {
        // TODO: Do some logic here to check if the user is the owner of the current blog post
        return true;
    }

    useEffect(() => {
        setIsFetchingBlogPost(true);
        useGetBlogPostByPostId(blogPostId).then((fetchedBlogPost: BlogPost[]) => {
            setIsOwner(checkIfOwner());
            setBlogPost(fetchedBlogPost[0]);
            setIsFetchingBlogPost(false);
        });
    }, [blogPostId]);

    const handleDelete = async () => {
        setDeleteIsLoading(true);
        await useDeleteBlogPostByPostId(blogPostId);
        setDeleteIsLoading(false);
        history.replace(`/`);
    }

    const handleEdit = () => {
        history.push(`/edit-post/${blogPostId}`);
    }

    const render = () => {
        if (isFetchingBlogPost) {
            return <PageLoadingIndicator/>
        }
        if (blogPost != null) {
            return <BlogPostPageView
                onEdit={handleEdit}
                onDelete={handleDelete}
                deleteLoading={deleteIsLoading}
                isOwner={isOwner}
                readingSpeed={calculateReadTimeInMinutes(blogPost.content)} 
                blogPost={blogPost}/>
        }
        return <div>Blog post do not exist</div>
    }

    return ( render() )
}

export default BlogPostPagePresenter;
