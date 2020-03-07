import app from 'firebase/app';
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
        app.initializeApp(config);

        this.auth = app.auth();
        // this.database = app.database();
        this.facebook = new app.auth.FacebookAuthProvider();
        if (!FirebaseApp.apps.length) {
            FirebaseApp.initializeApp(firebaseConfig)
            FirebaseApp.firestore()
                .enablePersistence({ synchronizeTabs: true })
                .catch(err => console.log(err))
            }

            // instance variables
            this.db = FirebaseApp.firestore()
            this.ideasCollection = this.db.collection('ideas')
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignWithFacebook = () => this.auth.signInWithPopup(this.facebook)

    doSignInWithEmailAndPassword = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password: string) => this.auth.currentUser.updatePassword(password);
}
export default Firebase;
