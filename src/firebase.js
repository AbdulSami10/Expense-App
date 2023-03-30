// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9rj7BA8mT3Zf4raQB8OqCDvxf2nRuzFE",
  authDomain: "expense-app-77437.firebaseapp.com",
  databaseURL: "https://expense-app-77437-default-rtdb.firebaseio.com",
  projectId: "expense-app-77437",
  storageBucket: "expense-app-77437.appspot.com",
  messagingSenderId: "1071858600014",
  appId: "1:1071858600014:web:57bb115cd66820519ddb1f",
  measurementId: "G-YJXLB7DLHV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getDatabase(app);
const analytics = getAnalytics(app);
