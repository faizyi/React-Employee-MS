import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBaKlIt008k5Ke8LICxHpjWgCZnV0dsZiM",
  authDomain: "employees-ms.firebaseapp.com",
  projectId: "employees-ms",
  storageBucket: "employees-ms.appspot.com",
  messagingSenderId: "591741959734",
  appId: "1:591741959734:web:5f8d0b7e634aab4bffa297",
  measurementId: "G-TVKXSE20JR"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)