import React from 'react';
import { useSelector } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';

const Dashboard = () => {
    const user = useSelector((state: any) => state.user);

    if (!user) {
        return null;
    }

    return (
      <div>
          <Winners />
          <VoteForm />
        </div>
    );
};

export default Dashboard;
