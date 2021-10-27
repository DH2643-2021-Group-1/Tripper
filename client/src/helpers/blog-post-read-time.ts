import {
  BlogPostContent,
  BlogPostContentPieceAny,
} from "../models/blog-post-content/blog-post-content";
import { BlogPostContentParagraph } from "../models/blog-post-content/blog-post-content-paragraph";
import { BlogPostContentTitle } from "../models/blog-post-content/blog-post-content-title";

/** This calculate read time assuming that the reading speed of the user is 250 words per minute */
export const calculateReadTimeInMinutes = (
  blogPostContent: BlogPostContent,
) => {
  const readingSpeedWordsPerMinutes = 250;
  let totalNumberOfWordsInBlogPost = 0;
  blogPostContent.contentPieces.forEach((piece: BlogPostContentPieceAny) => {
    if (piece.type == "title") {
      totalNumberOfWordsInBlogPost += (piece as BlogPostContentTitle).title
        .length;
    }
    if (piece.type == "paragraph") {
      totalNumberOfWordsInBlogPost += (piece as BlogPostContentParagraph).text
        .length;
    }

    // We can assume that the users looks at the image a bit
    if (piece.type == "image") {
      totalNumberOfWordsInBlogPost += 25;
    }
  });

  return Math.round(totalNumberOfWordsInBlogPost / readingSpeedWordsPerMinutes);
};
