const fs = require("node:fs");
const path = require("node:path");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const config = require("../src/config");

if (!config.FIREBASE_CREDENTIALS_PATH) {
    throw new Error(
        "Firebase credentials path is missing. Set FIREBASE_CREDENTIALS_PATH in your environment."
    );
}

const credentialsPath = path.resolve(config.FIREBASE_CREDENTIALS_PATH);
const serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
const projectId =
    config.FIREBASE_PROJECT_ID ||
    config.GOOGLE_CLOUD_PROJECT ||
    config.GCLOUD_PROJECT ||
    serviceAccount.project_id;

if (!projectId) {
    throw new Error(
        "Firebase project ID is missing. Set FIREBASE_PROJECT_ID or use a service-account JSON with project_id."
    );
}

const app = getApps()[0] || initializeApp({
    credential: cert(serviceAccount),
    projectId,
});

const db = getFirestore(app);

async function verifyConnection() {
    await db.listCollections();
}

module.exports = {
    db,
    verifyConnection,
};
