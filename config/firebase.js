// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMHorZTQ7-_a9ALG2HnyyQ4izFDIveB4Q",
  authDomain: "letgossip-7b1fc.firebaseapp.com",
  projectId: "letgossip-7b1fc",
  storageBucket: "letgossip-7b1fc.firebasestorage.app",
  messagingSenderId: "296723979541",
  appId: "1:296723979541:web:14b5ff8caab93d6f189d1c",
};

// Initialize Firebase

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { app };
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firebaseAuth = getAuth(app);
