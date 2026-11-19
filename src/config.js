require("dotenv").config();

const port = Number(process.env.PORT || 3000);
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;
const FIREBASE_CREDENTIALS_PATH = process.env.FIREBASE_CREDENTIALS_PATH;

module.exports = {
    port,
    FIREBASE_PROJECT_ID,
    GOOGLE_CLOUD_PROJECT,
    GCLOUD_PROJECT,
    FIREBASE_CREDENTIALS_PATH
};
