import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyAVd0HLl7_NMyeE5Msmg2eX1hqesGoyXRQ",
    authDomain: "algo-usaco.firebaseapp.com",
    databaseURL: "https://algo-usaco-default-rtdb.firebaseio.com",
    projectId: "algo-usaco",
    storageBucket: "algo-usaco.appspot.com",
    messagingSenderId: "56776411397",
    appId: "1:56776411397:web:5dcff79b859fd7f7ca4f6c",
    measurementId: "G-KYL07WP16G"
};
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
