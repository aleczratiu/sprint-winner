import React from 'react';
import { useSelector } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';

const Dashboard = () => {
    const useSelector = useSelector(state => state.user);

    return (
        <div>
            <Winners />
            <VoteForm />
        </div>
    );
};

export default Dashboard;
