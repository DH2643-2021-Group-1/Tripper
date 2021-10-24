import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPostCard from './blog-post-card';
import { BlogPost } from '../../models/blog-post';
import { MemoryRouter } from 'react-router-dom';

const dummyBlogPost: BlogPost = {
    id: "43ds9f39h9shs",
    title: "This is a title",
    primaryImage: "https://www.swedishlapland.com/wp-content/uploads/1920_hiking_fullres_cjutsi-1920x842.jpg",
    description: "This is a description that is somewhat to long to be contained in the blog post card.",
    content: {
      contentPieces: [],
    },
    publicationDate: new Date(),
    author: {
      id: "000",
      email: "adajon@kth.se",
      displayName: "Adam",
      profilePicture: null,
    }
  } 

test('Title is rendered in blog post card', () => {
  render(<MemoryRouter><BlogPostCard data={dummyBlogPost}>Card Content</BlogPostCard></MemoryRouter>);
  const linkElement =  screen.getByText(dummyBlogPost.title);
  expect(linkElement).toBeInTheDocument();
});

test('Author name is rendered in blog post card', () => {
  render(<MemoryRouter><BlogPostCard data={dummyBlogPost}>Card Content</BlogPostCard></MemoryRouter>);
  const linkElement = screen.getByText(dummyBlogPost.author.displayName);
  expect(linkElement).toBeInTheDocument();
});
