// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8eUnKIgu91KFBx82XPtbujC-82-axuXM",
  authDomain: "connectme-web-e9239.firebaseapp.com",
  projectId: "connectme-web-e9239",
  storageBucket: "connectme-web-e9239.firebasestorage.app",
  messagingSenderId: "90860852919",
  appId: "1:90860852919:web:3c684635a2acf424e69f32",
  measurementId: "G-K3422H6QCS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
