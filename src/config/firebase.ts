// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmX8Tw11TCsABNzndpmkq1-jymoJBSslE",
  authDomain: "socialmedia-98876.firebaseapp.com",
  projectId: "socialmedia-98876",
  storageBucket: "socialmedia-98876.appspot.com",
  messagingSenderId: "1075758185425",
  appId: "1:1075758185425:web:27140148d5e6c00dbffef0",
  measurementId: "G-EXB8Y53S14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
