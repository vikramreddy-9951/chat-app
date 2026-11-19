## Install Dependencies

Install all the required Node.js packages using the following command:

npm install

## Database Configuration

Open the .env file in the project root directory.

Update the database credentials according to your local MySQL configuration.

Ensure the database server is running before starting the application.

## Firebase Configuration

Open the Firebase Console.

Select the Firebase project and navigate to Project Settings → Service Accounts.

Generate and download the Firebase service account JSON file.

Store the downloaded JSON file in a secure location.

Update the Firebase credentials file path in the .env file.

Example:

GOOGLE_APPLICATION_CREDENTIALS=./firebase/serviceAccountKey.json

Note: Firebase credentials and .env files contain sensitive information and should not be committed to GitHub.

## Run the Application

Once the dependencies and environment variables are configured, start the development server using:

npm run dev

The application will start using the port configured in the .env file.