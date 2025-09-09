// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-4bb53.firebaseapp.com",
  projectId: "loginvirtualcourses-4bb53",
  storageBucket: "loginvirtualcourses-4bb53.firebasestorage.app",
  messagingSenderId: "341062912682",
  appId: "1:341062912682:web:aecfa5a7cdaa3c59665ed3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {auth, provider}