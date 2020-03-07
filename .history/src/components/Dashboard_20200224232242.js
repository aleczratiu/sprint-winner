import React from 'react';
import { useSelector } from 'react-redux';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withFirebase } from '../firebase/index';

handleLoginWithGoogle = () => {
    this.props.firebase
        .doSignWithGoogle()
        .then((result) => {
            this.props.firebase.database.ref(`users/${result.user.uid}`).once('value')
                .then((snapshot) => {
                    if (!snapshot.val()) {
                        this.props.firebase.database.ref(`users/${result.user.uid}`).set({
                            displayName: result.user.displayName,
                            email: result.user.email,
                            phoneNumber: result.user.phoneNumber,
                            photoURL: result.user.photoURL,
                        });
                    }
                }).catch(error => console.log(error));
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        })
        .catch((error) => {
            console.log('error', error);
            this.setState({ error });
        });
};

const Dashboard = (props) => {
    console.log('Dashboard', props);
    const user = useSelector(state => state.user);
    console.log('user', user);

    if (!user) {
        return (
            <GoogleLoginButton onClick={this.handleLoginWithFacebook} />
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
