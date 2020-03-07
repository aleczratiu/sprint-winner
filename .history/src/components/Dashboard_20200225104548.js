import React from 'react';
import { useSelector } from 'react-redux';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withFirebase } from '../firebase/index';

const Dashboard = ({ firebase }) => {
    console.log('Dashboard', firebase);
    const user = useSelector(state => state.user);
    console.log('user', user);

    const handleLoginWithGoogle = () => {
        firebase
            .doSignWithGoogle()
            .then((result) => {
                // setare users + id
                firebase.db.collection('users').onSnapshot((snapshot) => {
                    console.log('snapshot', snapshot);
                    snapshot.docs.map((doc) => {
                        if (!doc) {
                            console.log({
                                doc,
                                result,
                            });
                            firebase.db.collection(`users/${result.user.uid}`).add({
                                displayName: result.user.displayName,
                                email: result.user.email,
                                phoneNumber: result.user.phoneNumber,
                                photoURL: result.user.photoURL,
                            });
                        }
                    });
                }).catch(error => console.log(error));
            })
            .catch((error) => {
                console.log('error', error);
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

export default withFirebase(Dashboard);
