import React from 'react';

function SignIn({ firebase }) {
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
                // this.setState({ ...INITIAL_STATE });
                // this.props.history.push(ROUTES.HOME);
            })
            .catch((error) => {
                console.log('error', error);
                // this.setState({ error });
            });
    };

    return (
      <GoogleLoginButton onClick={handleLoginWithGoogle} />
    );
}

export default SignIn;
