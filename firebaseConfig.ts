/* b.	Implement secure authentication practices to address any improper authentication vulnerabilities. */
import { initializeApp }from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from  'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // API key for accessing Firebase services
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // Domain for Firebase authentication
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // ID of the Firebase project
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Storage bucket for Firebase storage service
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // Sender ID for Firebase messaging
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // App ID for the Firebase application
};


// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const firebase_db = getFirestore(firebase_app);