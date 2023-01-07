// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging/sw";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS6vWkeik2qoCF_38eoJSOKgffX2yaih4",
  authDomain: "bikesapp-9a931.firebaseapp.com",
  projectId: "bikesapp-9a931",
  storageBucket: "bikesapp-9a931.appspot.com",
  messagingSenderId: "861135800563",
  appId: "1:861135800563:web:4c2438879cefeba6874f86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const firestore = getFirestore(app);
