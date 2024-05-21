import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.ENV_FIREBASE_API_KEY,
  authDomain: 'food-app-kts.firebaseapp.com',
  projectId: 'food-app-kts',
  storageBucket: 'food-app-kts.appspot.com',
  messagingSenderId: process.env.ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.ENV_FIREBASE_APP_ID,
};

const initApp = initializeApp(firebaseConfig);

export const auth = getAuth(initApp);
export const db = getFirestore(initApp);
