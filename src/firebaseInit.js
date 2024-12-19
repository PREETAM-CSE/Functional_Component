// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMt6cHkTozvUUpQZVErM68s3dbZj609sQ",
  authDomain: "blogging-app-76b4b.firebaseapp.com",
  projectId: "blogging-app-76b4b",
  storageBucket: "blogging-app-76b4b.firebasestorage.app",
  messagingSenderId: "951362618433",
  appId: "1:951362618433:web:4cd4177ed80bb0b1ceb2c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);