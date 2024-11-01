import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let isFirebaseInitialized = false;

const FirebaseApp = {
  apiKey: "AIzaSyA6N33b1_EekHgK3xAR4t4ZyVrpufdW3VY",
  authDomain: "ini-glow.firebaseapp.com",
  projectId: "ini-glow",
  storageBucket: "bagstore-pro.appspot.com",
  messagingSenderId: "655304909788",
  appId: "1:655304909788:web:5e12f5ebc02d384eaf6519"
};

let database: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

const initializeFirebase = () => {
  if (!isFirebaseInitialized) {
    const app = initializeApp(FirebaseApp);
    database = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    isFirebaseInitialized = true;
  }
};

initializeFirebase();

export { auth, database, storage };
