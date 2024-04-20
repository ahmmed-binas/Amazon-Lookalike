import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm_V7-saXpJOhLrsXxYRxQfenaDOA1ODk",
  authDomain: "clone-5b36b.firebaseapp.com",
  projectId: "clone-5b36b",
  storageBucket: "clone-5b36b.appspot.com",
  messagingSenderId: "431345323945",
  appId: "1:431345323945:web:f6722541379f001753feb8",
  measurementId: "G-XF28SMELF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,onAuthStateChanged, createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut};
