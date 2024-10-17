// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAmkzlG0zsC3LnqEnsrDXx4AWvFZ7K-jE",
  authDomain: "mobile-da348.firebaseapp.com",
  projectId: "mobile-da348",
  storageBucket: "mobile-da348.appspot.com",
  messagingSenderId: "243300888073",
  appId: "1:243300888073:web:7595544d19951fd4f452d8",
  measurementId: "G-MYL7YHLDP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);