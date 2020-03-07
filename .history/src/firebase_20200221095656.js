// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLpqdmResuTNkSIXqP2FJSBPshQiZ_Nb8",
    authDomain: "sprint-man.firebaseapp.com",
    databaseURL: "https://sprint-man.firebaseio.com",
    projectId: "sprint-man",
    storageBucket: "sprint-man.appspot.com",
    messagingSenderId: "770072484683",
    appId: "1:770072484683:web:624552ba9abfe5dd9ca6ce"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
