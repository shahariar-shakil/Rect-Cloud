// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZl8pfOC0doPVyBJ79cev5mYKMsvdmOrI",
  authDomain: "react-cloud-5a6eb.firebaseapp.com",
  projectId: "react-cloud-5a6eb",
  storageBucket: "react-cloud-5a6eb.appspot.com",
  messagingSenderId: "1069697153033",
  appId: "1:1069697153033:web:bcaccf37ef4d6227bc20d8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
