import React, { Fragment } from 'react';
import { useStore } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';

const Dashboard = () => (
    <>
        <Winners />
        <VoteForm />
  </>
);

export default Dashboard;
