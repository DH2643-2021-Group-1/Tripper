import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-key.json';

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export default app.firestore();
