// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPZr9TCrawiezw7G9KGfJ-stbkDaduQFc",
  authDomain: "minecraftpodomoro.firebaseapp.com",
  projectId: "minecraftpodomoro",
  storageBucket: "minecraftpodomoro.firebasestorage.app",
  messagingSenderId: "606558822410",
  appId: "1:606558822410:web:92fc891636487ea3283ff3",
  measurementId: "G-6FEXGHFX7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);