import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


// Check if Firebase config has all necessary keys
if (Object.values(firebaseConfig).some((value) => value === undefined)) {
    console.error("Firebase configuration error: Missing environment variables", firebaseConfig);
  }
  
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence)
    .catch(error => {
      console.error("Firebase auth persistence error:", error);
    });
  
  const db = getFirestore(app);
  const storage = getStorage(app);
  let analytics;
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Analytics initialization error:", error);
  }
  
  export { auth, db, storage, analytics };
  