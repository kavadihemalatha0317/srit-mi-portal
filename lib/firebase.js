import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "NUV_API_KEY",
  authDomain: "NUV_AUTH_DOMAIN",
  projectId: "NUV_PROJECT_ID",
  storageBucket: "NUV_STORAGE",
  messagingSenderId: "NUV_SENDER",
  appId: "NUV_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
