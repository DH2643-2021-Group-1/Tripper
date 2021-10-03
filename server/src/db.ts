import * as admin from 'firebase-admin';

var serviceAccount = require("../firebase-key.json");

const db = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = db;
