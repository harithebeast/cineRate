import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD-pcOOw4cIsvunn0tQ2NbCDVhmwnnr_M0",
  authDomain: "netflix-clone-db5a0.firebaseapp.com",
  projectId: "netflix-clone-db5a0",
  storageBucket: "netflix-clone-db5a0.appspot.com",
  messagingSenderId: "412401231842",
  appId: "1:412401231842:web:8717bd24daa5a5e467bbbb",
  measurementId: "G-76ERTTG028"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
