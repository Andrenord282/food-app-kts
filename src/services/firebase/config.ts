import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAM16OQv3tuDu27vSqjSkE8ikQGko1hB8M',
  authDomain: 'food-app-kts.firebaseapp.com',
  projectId: 'food-app-kts',
  storageBucket: 'food-app-kts.appspot.com',
  messagingSenderId: '522554713260',
  appId: '1:522554713260:web:6b8b221e2a898b37736b09',
};

const initApp = initializeApp(firebaseConfig);

export const auth = getAuth(initApp);
export const db = getFirestore(initApp);

