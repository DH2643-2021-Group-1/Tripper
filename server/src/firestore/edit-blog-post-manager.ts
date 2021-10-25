import * as express from "express";

import { auth, firestore } from "firebase-admin";
import { db, storage } from "../db";
import { respond, StatusCode } from "../response-code-manager";
import { deleteImage, uploadImage } from "./image-manager";

enum EditType {
  none,
  delete,
  new,
  edited,
}

interface BlogPostContent {
  contentPieces: {
    id: string;
    editType: EditType;
    imageUrl: string;
    hasNewFile?: boolean;
    type: "title" | "paragraph" | "image";
  }[];
}

const createBlogPost = async (req: express.Request, res: express.Response) => {
  try {
    var docRef = await createNewBlogPostDocInFirestore(
      req.body.title,
      req.body.description,
      req.body.userId,
    );
  } catch (_) {
    respond(res, {
      statusCode: StatusCode.ErrorFirestoreCreate,
      error: "Could not create a new blogpost document in the database",
    });
    return;
  }

  const [primaryImage, imagePieces] = extractBlogPostImagesFromFileBody(
    req.files,
  );

  if (primaryImage == null) {
    respond(res, {
      statusCode: StatusCode.RequestNoPrimaryImage,
      error: "Primary image is required",
    });
    errorCleanUp(docRef);
    return;
  }

  try {
    var primaryImageUrl = await uploadImage(
      primaryImage,
      `blogPostImages/${docRef.id}.png`,
    );
  } catch (error) {
    respond(res, {
      statusCode: StatusCode.ErrorCouldNoUploadImage,
      error: "Could not upload the primary image",
    });
    errorCleanUp(docRef);
    return;
  }

  try {
    var preparedContent = await prepareBlogPostContent(
      JSON.parse(req.body.content),
      imagePieces,
    );
  } catch (error) {
    respond(res, {
      statusCode: StatusCode.ErrorBlogPostContentPreparation,
      error: "Could not prepare the blog post content for upload",
    });
    errorCleanUp(docRef);
    return;
  }

  await docRef.update({
    primaryImage: primaryImageUrl,
    content: preparedContent,
  });

  respond(res, {
    data: { blogPostId: docRef.id },
    statusCode: StatusCode.OK,
    message: "The blog post was successfully created",
  });
};

const updateBlogPost = async (req: express.Request, res: express.Response) => {
  try {
    var existingBlogPost = await db
      .collection("blogposts")
      .doc(req.body.id)
      .get();
  } catch (_) {
    respond(res, {
      statusCode: StatusCode.RequestBlogPostDoNotExist,
      error: `Blog post with id: '${req.body.id}' do not exist`,
    });
    return;
  }

  const [primaryImage, imagePieces] = extractBlogPostImagesFromFileBody(
    req.files,
  );

  if (primaryImage != null) {
    try {
      await replacePrimaryImage(existingBlogPost.ref, primaryImage);
    } catch (_) {
      respond(res, {
        statusCode: StatusCode.ErrorCouldNoUploadImage,
        error: `Could not replace the existing primary image`,
      });
      return;
    }
  }

  try {
    var preparedContent = await prepareBlogPostContent(
      JSON.parse(req.body.content),
      imagePieces,
    );
  } catch (error) {
    respond(res, {
      statusCode: StatusCode.ErrorBlogPostContentPreparation,
      error: "Could not prepare the blog post content for upload",
    });
    return;
  }

  await existingBlogPost.ref.update({
    title: req.body.title,
    description: req.body.description,
    content: preparedContent,
  });

  respond(res, {
    statusCode: StatusCode.OK,
    message: "The blog post was successfully updated",
  });
};

const deleteBlogPost = async (req: express.Request, res: express.Response) => {
  const warnings: string[] = [];

  try {
    var blogPostToDelete = await db
      .collection("blogposts")
      .doc(req.params.id)
      .get();
  } catch (_) {
    respond(res, {
      statusCode: StatusCode.RequestBlogPostDoNotExist,
      error: `Blog post with id: '${req.body.id}' do not exist`,
    });
    return;
  }

  try {
    await deletePrimaryImage(blogPostToDelete.id);
  } catch (_) {
    warnings.push("Failed to remove the primary image");
  }

  try {
    await removeAllImagesFromBlogPostContent(blogPostToDelete.data()!.content);
  } catch (_) {
    warnings.push("Failed to remove the images from the content");
  }

  try {
    await blogPostToDelete.ref.delete();
  } catch (_) {
    warnings.push("Failed to delete the blog post from database");
  }

  respond(res, {
    statusCode: StatusCode.OK,
    message: "Successfully delete the blog post",
    warning: warnings,
  });
};

/** Returns the primary image and also an array of imagePieces */
const extractBlogPostImagesFromFileBody = (
  rawFiles:
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined,
): [Express.Multer.File | null, Express.Multer.File[] | null] => {
  if (rawFiles == undefined) return [null, null];
  const files = rawFiles as { [fieldname: string]: Express.Multer.File[] };
  const primaryImage = (files["primaryImage"] ?? [null])[0];
  const imagePieces = files["imagePieces"];
  return [primaryImage, imagePieces];
};

/** This uploads all the images and sets image urls, as well as deleting removed content pieces  */
const prepareBlogPostContent = async (
  content: BlogPostContent,
  files: Express.Multer.File[] | null,
) => {
  await removeDeletedImagePiecesFromDatabase(content);
  filterOutDeletedContentPieces(content);

  if (files == null) return content;
  const contentWithImages = await uploadImagePiecesAndSetImageUrls(
    content,
    files,
  );
  return resetContentEditTypes(contentWithImages);
};

const createNewBlogPostDocInFirestore = async (
  title: string,
  description: string,
  userId: string,
) => {
  return db.collection("blogposts").add({
    title: title,
    description: description,
    userRef: db.doc(`users/${userId}`),
    publicationDate: new Date().getTime(),
    primaryImage: "",
  });
};

const filterOutDeletedContentPieces = (content: BlogPostContent) => {
  content.contentPieces = content.contentPieces.filter((piece: any) => {
    return piece.editType != EditType.delete;
  });
};

const removeDeletedImagePiecesFromDatabase = async (
  content: BlogPostContent,
) => {
  for (const piece of content.contentPieces) {
    if (
      piece.type == "image" &&
      piece.editType == EditType.delete &&
      piece.imageUrl != null
    ) {
      try {
        await deleteImage(`blogPostImages/${piece.id}.png`);
      } catch (error) {}
    }
  }
};

const resetContentEditTypes = (content: BlogPostContent) => {
  for (const piece of content.contentPieces) {
    piece.editType = EditType.none;
    piece.hasNewFile = false;
  }
  return content;
};

const uploadImagePiecesAndSetImageUrls = async (
  content: BlogPostContent,
  files: Express.Multer.File[],
) => {
  let fileIndex = 0;
  for (const piece of content.contentPieces) {
    if (piece.type != "image") continue;

    if (!piece.hasNewFile) continue;

    const imagePieceHasNewFile = files != null && files[fileIndex] != null;
    if (!imagePieceHasNewFile) continue;

    const url = await uploadImage(
      files[fileIndex],
      `blogPostImages/${piece.id}.png`,
    );
    piece.imageUrl = url;
    fileIndex++;
  }
  return content;
};

const replacePrimaryImage = async (
  docRef: firestore.DocumentReference,
  newFile: Express.Multer.File,
) => {
  const primaryImagePath = `blogPostImages/${docRef.id}.png`;
  try {
    await deleteImage(primaryImagePath);
  } catch (error) {}
  const newImageUrl = await uploadImage(newFile, primaryImagePath);
  await docRef.update({
    primaryImagePath: newImageUrl,
  });
};

const deletePrimaryImage = async (docId: string) => {
  const primaryImagePath = `blogPostImages/${docId}.png`;
  await deleteImage(primaryImagePath);
};

const errorCleanUp = async (doc: firestore.DocumentReference) => {
  await doc.delete();
};

const removeAllImagesFromBlogPostContent = async (content: BlogPostContent) => {
  content.contentPieces.forEach((piece) => {
    piece.editType = EditType.delete;
  });
  await removeDeletedImagePiecesFromDatabase(content);
};

export { createBlogPost, updateBlogPost, deleteBlogPost };
