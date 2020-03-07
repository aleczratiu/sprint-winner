import React from 'react';
import { useSelector } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';
import {
    GoogleLoginButton,
} from 'react-social-login-buttons';
import { withFirebase } from '../firebase/index';

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
