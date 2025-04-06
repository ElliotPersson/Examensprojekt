import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Configuration settings:
const firebaseConfig = {

    apiKey: "AIzaSyCx2RqkRGSeqbLVcmNF_3KbIyAk9Q6M3b8",

    authDomain: "chatforum-c8953.firebaseapp.com",
  
    projectId: "chatforum-c8953",
  
    storageBucket: "chatforum-c8953.firebasestorage.app",
  
    messagingSenderId: "94908371260",
  
    appId: "1:94908371260:web:4f6960c5db601b3fa58e39"
  


};

// Initialize Firebase:
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


