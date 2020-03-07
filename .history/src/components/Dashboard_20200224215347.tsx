import React, { Fragment } from 'react';
import { useStore } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';

const Dashboard = () => (
    <div>
        <Winners />
        <VoteForm />
  </div>
);

export default Dashboard;
