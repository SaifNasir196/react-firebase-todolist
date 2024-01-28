// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyD3DrgpiPwfKsUHM3_CsxVOHV_lrQ1cac4",
  authDomain: "todolist-70726.firebaseapp.com",
  projectId: "todolist-70726",
  storageBucket: "todolist-70726.appspot.com",
  messagingSenderId: "681322743977",
  appId: "1:681322743977:web:2ac26d7175f47f030681b8",
  measurementId: "G-6SZYWWCRCW" // optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);