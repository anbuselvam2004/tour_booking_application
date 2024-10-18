// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider} from "firebase/auth";
import{getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXc3LCll4NzDOL0k10s24NoHYnGM_S1tM",
  authDomain: "fir-login-b5b81.firebaseapp.com",
  projectId: "fir-login-b5b81",
  storageBucket: "fir-login-b5b81.appspot.com",
  messagingSenderId: "1031784630782",
  appId: "1:1031784630782:web:87ebc00dd61e3b82a918af",
  measurementId: "G-8HGQTTZBT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();

export const db=getFirestore(app);
export const Store=getStorage(app);