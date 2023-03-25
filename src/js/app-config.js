import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDocs, collection, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
export const firebaseConfig = {
    apiKey: "AIzaSyBwNVTJ6jAHVmxuAjZyu93EOoj3Mhb_i4s",
    authDomain: "omplish.firebaseapp.com",
    projectId: "omplish",
    storageBucket: "omplish.appspot.com",
    messagingSenderId: "713045925177",
    appId: "1:713045925177:web:add32c8af33093945c5ce8",
    measurementId: "G-GMWKMTJ4TL"
}
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
