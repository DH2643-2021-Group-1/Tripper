import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostCard from './blog-post-card';
import { BlogPost } from '../../models/blog-post';

const dummyBlogPost: BlogPost = {
    id: "43ds9f39h9shs",
    title: "This is a title",
    primaryImage: "https://www.swedishlapland.com/wp-content/uploads/1920_hiking_fullres_cjutsi-1920x842.jpg",
    description: "This is a description that is somewhat to long to be contained in the blog post card.",
    content: "TODO",
    publicationDate: new Date(),
    author: {
      email: "adajon@kth.se",
      firstName: "Adam",
      lastName: "Jonsson",
      profilePicture: null,
    }
  } 

test('Title is rendered in blog post card', async () => {
  render(<BlogPostCard data={dummyBlogPost}>Card Content</BlogPostCard>);
  const linkElement = await screen.findByText(dummyBlogPost.title);
  expect(linkElement).toBeInTheDocument();
});

test('Author name is rendered in blog post card', async () => {
  render(<BlogPostCard data={dummyBlogPost}>Card Content</BlogPostCard>);
  const linkElement = await screen.findByText(dummyBlogPost.author.firstName + " " + dummyBlogPost.author.lastName);
  expect(linkElement).toBeInTheDocument();
});
