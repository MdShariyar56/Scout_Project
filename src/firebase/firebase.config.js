// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXwlp9XAUIyZJgoFnfNJBpdmQqSoVcH_4",
  authDomain: "scout-project-be538.firebaseapp.com",
  projectId: "scout-project-be538",
  storageBucket: "scout-project-be538.firebasestorage.app",
  messagingSenderId: "378734647500",
  appId: "1:378734647500:web:efe5b8ab2e4651a86b0a69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);