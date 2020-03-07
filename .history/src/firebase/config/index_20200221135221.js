import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_MEASUREMENT_ID,
};

class Firebase {
    constructor() {
        // Initialize Firebase
        firebase.initializeApp(config);

        this.auth = firebase.auth();
        this.database = firebase.database();
        this.facebook = new firebase.auth.FacebookAuthProvider();
    }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignWithFacebook = () => this.auth.signInWithPopup(this.facebook)
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
}

export const db = ;

export {
    db: firebase.firestore(),
    Firebase,
}
