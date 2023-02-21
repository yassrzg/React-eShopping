// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";






// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC3vIteyKhW3Gc7G9ajiiJHyXQveWyZwDE",
  authDomain: "yl-compagnies.firebaseapp.com",
  projectId: "yl-compagnies",
  storageBucket: "yl-compagnies.appspot.com",
  messagingSenderId: "7227533624",
  appId: "1:7227533624:web:44b10c217552d07c5af9cd",
  measurementId: "G-HGS5RME0HM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const user = uid => doc(db, `users/${uid}`);


// STORAGE 

export const storage = getStorage(app);






