import * as admin from "firebase-admin";
import * as serviceAccount from "./firebase-key.json";

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "gs://tripper-diary.appspot.com",
});

export const db = app.firestore();
export const storage = app.storage();
