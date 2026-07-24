// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // idhi add chey bro

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDra1qwWqvST3DoCKUCrfjw6jYAR6W35gg",
  authDomain: "srit-mini-internship.firebaseapp.com",
  projectId: "srit-mini-internship",
  storageBucket: "srit-mini-internship.firebasestorage.app",
  messagingSenderId: "301325399899",
  appId: "1:301325399899:web:3791ba62f63f4061930c7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // idhi chala important bro
