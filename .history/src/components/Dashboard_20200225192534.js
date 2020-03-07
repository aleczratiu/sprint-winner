import React from 'react';
import { useSelector } from 'react-redux';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withFirebase } from '../firebase/index';
import { withAuthorization } from '../session';

const Dashboard = ({ firebase }) => {
    console.log('Dashboard', firebase);
    const user = useSelector(state => state.user);
    console.log('user', user);

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

    if (!user) {
        return (
            <GoogleLoginButton onClick={handleLoginWithGoogle} />
        );
    }

    return (
        <div>
        <Winners />
        <VoteForm />
      </div>
    );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Dashboard));
