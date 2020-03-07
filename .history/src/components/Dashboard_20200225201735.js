import React from 'react';
import { useSelector } from 'react-redux';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withFirebase } from '../firebase/index';
import { withAuthorization } from '../session/index';

const Dashboard = ({ firebase }) => {
    console.log('Dashboard', firebase);
    const user = useSelector(state => state.user);
    console.log('user', user);

    return (
        <div>
        <Winners />
        <VoteForm />
      </div>
    );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Dashboard));
