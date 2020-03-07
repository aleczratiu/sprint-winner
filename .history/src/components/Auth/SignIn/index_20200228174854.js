import React from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { withRouter } from 'react-router-dom';
import { HOME } from '../../../constants';
import { withFirebase } from '../../../firebase/index';

function SignIn({ firebase, history }) {
    const handleLoginWithGoogle = () => {
        firebase
            .doSignWithGoogle()
            .then((result) => {
                firebase.database.ref(`users/${result.user.uid}`).once('value')
                    .then((snapshot) => {
                        if (!snapshot.val()) {
                            firebase.database.ref(`users/${result.user.uid}`).set({
                                displayName: result.user.displayName,
                                email: result.user.email,
                                phoneNumber: result.user.phoneNumber,
                                photoURL: result.user.photoURL,
                            });
                        }
                    }).catch(error => console.log(error));
                history.push(HOME);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    return (
        <GoogleLoginButton onClick={handleLoginWithGoogle} />
    );
}

export default withFirebase(withRouter(SignIn));
