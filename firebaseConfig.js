// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDvHdzKSxIRgfcFbr-B2mvqo5eh6mosd7g",
    authDomain: "thaiseva-85cda.firebaseapp.com",
    databaseURL: "https://thaiseva-85cda-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thaiseva-85cda",
    storageBucket: "thaiseva-85cda.appspot.com",
    messagingSenderId: "113396010755",
    appId: "1:113396010755:web:bbfaf73ef75baebc572336",
    measurementId: "G-YWC536LCCB"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth };
export { db, storage };