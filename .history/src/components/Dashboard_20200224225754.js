import React from 'react';
import { useSelector } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withFirebase } from '../firebase/index';

const Dashboard = (props) => {
    console.log('Dashboard', props);
    const user = useSelector(state => state.user);

    if (!user.data) {
        return <h1>Logheaza-te</h1>;
    }

    return (
        <div>
            <Winners />
            <VoteForm />
      </div>
    );
};

export default withFirebase(Dashboard);
