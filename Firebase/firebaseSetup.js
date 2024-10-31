// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// // // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_apiKey,
//   authDomain: process.env.EXPO_PUBLIC_authDomain,
//   projectId: process.env.EXPO_PUBLIC_projectId,
//   storageBucket: process.env.EXPO_PUBLIC_storageBucket,
//   messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
//   appId: process.env.EXPO_PUBLIC_appId,
// };

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
export const database = getFirestore(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});