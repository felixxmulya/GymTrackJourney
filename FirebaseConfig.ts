// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCNBl08tqn1-EP-f0O3kQySSzGOnOVDvjQ",
  authDomain: "gym-track-journey.firebaseapp.com",
  projectId: "gym-track-journey",
  storageBucket: "gym-track-journey.appspot.com",
  messagingSenderId: "307347985678",
  appId: "1:307347985678:web:5ee9a102f1bc3c7253b35f",
  measurementId: "G-LJNXXGBVBM"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const analytics = getAnalytics(FIREBASE_APP);