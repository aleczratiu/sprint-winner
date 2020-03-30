import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.REACT_MEASUREMENT_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.database = app.database();
        this.facebook = new app.auth.FacebookAuthProvider();
        this.google = new app.auth.GoogleAuthProvider();
    }

    // Auth API
    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignWithFacebook = () => this.auth.signInWithPopup(this.facebook)

    doSignWithGoogle = () => this.auth.signInWithPopup(this.google)

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    killAllSessions = () => {
        this.auth.signOut()
    }
}
export default Firebase;
