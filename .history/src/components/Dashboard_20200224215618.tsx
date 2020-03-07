import React from 'react';
import { useSelector } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';

const Dashboard = () => {
    const user = useSelector((state: any) => state.user);

    if (!user) {
        return <h1>Logheaza-te</h1>;
    }

    return (
        <div>
            <Winners />
            <VoteForm />
      </div>
    );
};

export default Dashboard;
