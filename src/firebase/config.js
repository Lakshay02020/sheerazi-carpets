import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's actual Firebase configuration keys
// To get these keys: Go to Firebase Console -> Project Settings -> General -> Your Web App

const firebaseConfig = {
  apiKey: "AIzaSyCwbeM0_JtCEP18ApVMxixE2zI2ZTDet94",
  authDomain: "sheerazi-carpets.firebaseapp.com",
  projectId: "sheerazi-carpets",
  storageBucket: "sheerazi-carpets.firebasestorage.app",
  messagingSenderId: "577045448523",
  appId: "1:577045448523:web:9770d30298b73a82004ace",
  measurementId: "G-R6MVFR1X93"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { db, storage };
