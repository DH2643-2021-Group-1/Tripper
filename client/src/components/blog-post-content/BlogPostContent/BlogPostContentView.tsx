import React, { FC } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { BlogPostContent, BlogPostContentPieceAny } from '../../../models/blog-post-content/blog-post-content';
import { BlogPostContentImage } from '../../../models/blog-post-content/blog-post-content-image';
import { BlogPostContentParagraph } from '../../../models/blog-post-content/blog-post-content-paragraph';
import { BlogPostContentPiece, EditType } from '../../../models/blog-post-content/blog-post-content-piece';
import { BlogPostContentTitle } from '../../../models/blog-post-content/blog-post-content-title';
import ContentWrapper from '../../content-wrapper/content-wrapper';
import BlogPostContentEditWrapper from '../BlogPostContentEditWrapper/BlogPostContentEditWrapper';
import BlogPostContentImagePresenter from '../BlogPostContentImage/BlogPostContentImagePresenter';
import BlogPostContentParagraphView from '../BlogPostContentParagraph/BlogPostContentParagraphView';
import BlogPostContentTitleView from '../BlogPostContentTitle/BlogPostContentTitleView';
import { BlogPostContentEditRequest } from './BlogPostContentPresenter';

interface BlogPostContentViewProps {
    contentPiecesToRender: BlogPostContentPieceAny[],
    editMode: boolean,
    onEditRequest: (contentPiece: BlogPostContentPieceAny) => void,
    onReorder: (contentPieces: BlogPostContentPieceAny[]) => void,
    onDelete: (contentPieces: BlogPostContentPieceAny) => void,
}

const BlogPostContentView: FC<BlogPostContentViewProps> = (props) => {

    const renderCorrectPieceView = (piece: BlogPostContentPiece, index: number) => {
        switch (piece.type) {
            case "title":
                return <BlogPostContentTitleView
                    piece={ piece as BlogPostContentTitle } />
            case "paragraph":
                return <BlogPostContentParagraphView 
                    piece={ piece as BlogPostContentParagraph } />
            case "image":
                return <BlogPostContentImagePresenter 
                    onPieceUpdate={ updatedPiece => props.onEditRequest(updatedPiece) }
                    piece={ piece as BlogPostContentImage } />;
            default:
                return <div>Could not load content</div>
        }
    }

    const shouldRenderPiece = (piece: BlogPostContentPiece) => {
        return piece.editType != EditType.delete;
    }

    return (
        <ContentWrapper>
            <ReactSortable
                animation={200}
                handle={".handle"}
                disabled={!props.editMode}
                list={props.contentPiecesToRender} 
                setList={(newOrder) => props.onReorder(newOrder)}>
                {props.contentPiecesToRender.map(
                    (piece, index) => {
                        if (!shouldRenderPiece(piece)) return <></>;
                        return (
                            <BlogPostContentEditWrapper 
                                key={piece.id} 
                                editMode={props.editMode} 
                                onDeleteRequest={() => props.onDelete(piece)}>
                                { renderCorrectPieceView(piece, index) }
                            </BlogPostContentEditWrapper>
                        )                        
                    }
                )}
            </ReactSortable>
        </ContentWrapper>
    )
}

export default BlogPostContentView;