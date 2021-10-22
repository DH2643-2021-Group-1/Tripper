import { storage } from '../db';

export async function uploadImage(file: any, path: string) {
    const bucket = storage.bucket()
    const imageBuffer = file?.buffer as Buffer;
    const bucketFile = bucket.file(path);
    //TODO: Check if the file is valid
    await bucketFile.save(imageBuffer);
    return bucketFile.getSignedUrl({
        action: 'read',
        expires: '01-01-2500'
    });
}

export async function deleteImage(filePath: string) {
    const bucket = storage.bucket()
    const fileToDelete = bucket.file(filePath);
    await fileToDelete.delete();
}