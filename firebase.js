// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIk2WWE-5p36E_ivT_3lf7XXA2wKPd3XA",
  authDomain: "tesing-a3bdf.firebaseapp.com",
  projectId: "tesing-a3bdf",
  storageBucket: "tesing-a3bdf.appspot.com",
  messagingSenderId: "14403813164",
  appId: "1:14403813164:web:892bbca1e5ef9154153689",
  measurementId: "G-J6D89E7TYV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
