import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import * as serviceAccount from './firebase-key.json';

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});


export const db = app.firestore();
export const storage = app.storage();

