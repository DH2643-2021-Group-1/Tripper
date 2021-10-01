import React, { FC, useEffect, useState } from 'react';
import { BlogPost } from '../../models/blog-post';
import BlogPostPagePresenter from './blog-post-page-presenter';

const BlogPostPage: FC = (props) => {
    const blogPostId = 0;

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [isFetchingBlogPost, setIsFetchingBlogPost] = useState<boolean>(true);

    useEffect(() => {
        setIsFetchingBlogPost(true);
        // TODO: Fetch the correct blog post
        const dummyBlogPost: BlogPost = {
            id: "43ds9f39h9shs",
            title: "This is a title",
            primaryImage: "https://www.swedishlapland.com/wp-content/uploads/1920_hiking_fullres_cjutsi-1920x842.jpg",
            description: "This is a description that is somewhat to long to be contained in the blog post card.",
            content: "<h1>Test</h1><p>This is a test how the blog post content looks like when presented in the blog post page. Hopefully the html will render correctly and the content will be readable in a nice way. Fingers crossed :)</p>",
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
    }, [blogPostId]);

    return (
        <BlogPostPagePresenter
            blogPost={blogPost}
            loading={isFetchingBlogPost}
            couldNotFindArticle={false}>
        </BlogPostPagePresenter>
    )
}

export default BlogPostPage;
