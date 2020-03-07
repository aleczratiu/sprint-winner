import React from 'react';
import { useSelector } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withFirebase } from '../firebase/index';

const Dashboard = ({ firebase }) => {
    const user = useSelector((state: any) => state.user);
    console.log('Dashboard', firebase);

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
