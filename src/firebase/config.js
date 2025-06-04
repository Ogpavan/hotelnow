// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi8oftv3wLMQdXtnjFnLrSviuYdsHIKYA",
  authDomain: "hotelnow-b4ef9.firebaseapp.com",
  projectId: "hotelnow-b4ef9",
  storageBucket: "hotelnow-b4ef9.firebasestorage.app",
  messagingSenderId: "607208290435",
  appId: "1:607208290435:web:d2ee33fdd147b4ed4fc3b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
