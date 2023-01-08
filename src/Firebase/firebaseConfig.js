import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDfVzLJGVTd0eJKSyOFuntOJZdpWahw4LI",
  authDomain: "ecommerce-2c849.firebaseapp.com",
  projectId: "ecommerce-2c849",
  storageBucket: "ecommerce-2c849.appspot.com",
  messagingSenderId: "1080771229762",
  appId: "1:1080771229762:web:8f3d0397515091542855db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
