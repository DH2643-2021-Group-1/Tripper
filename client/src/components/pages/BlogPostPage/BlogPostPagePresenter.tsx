import React, { FC, useEffect, useState } from 'react';
import PageLoadingIndicator from '../../page-loading-indicator/page-loading-indicator';
import { BlogPost } from '../../../models/blog-post';
import BlogPostPageView from './BlogPostPageView';
import { useParams } from 'react-router-dom';

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
        console.log(blogPostId);
        setIsFetchingBlogPost(true);
        // TODO: Fetch the correct blog post
        setTimeout(()=> {
            const dummyBlogPost: BlogPost = {
                id: "43ds9f39h9shs",
                title: "Very Cool Title for an Adventure!",
                primaryImage: "https://www.swedishlapland.com/wp-content/uploads/1920_hiking_fullres_cjutsi-1920x842.jpg",
                description: "This is a description that is somewhat to long to be contained in the blog post card.",
                content: "<h1>Test</h1><p>This is a test how the blog post content looks like when presented in the blog post page. Hopefully the html will render correctly and the content will be readable in a nice way. Fingers crossed :). I also wanted to add more text just to see how the paragraph could look like.</p><h1>Another title</h1><p>This is yet another paragraph to make it nicer to read and consume content on this site. I just write different words and we will see how it will look in the end. I am thiking about to make the text a little bigger and also to increase the line height of it</p>",
                publicationDate: new Date(),
                author: {
                  email: "adajon@kth.se",
                  firstName: "Adam",
                  lastName: "Jonsson",
                  profilePicture: null,
                }
            }
            setBlogPost(dummyBlogPost);
            setIsFetchingBlogPost(false);
        }, 1000);
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
