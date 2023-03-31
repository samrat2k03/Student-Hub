import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA7M-aoiG78NIkrrr6v7Oy1gqEWRjcBo2Y",
  authDomain: "student-hub-1.firebaseapp.com",
  projectId: "student-hub-1",
  storageBucket: "student-hub-1.appspot.com",
  messagingSenderId: "345674055053",
  appId: "1:345674055053:web:47720aa1b956b16ac091c4",
  measurementId: "G-VTJLWQ9B98"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);