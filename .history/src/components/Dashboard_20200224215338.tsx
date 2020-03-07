import React, { Fragment } from 'react';
import { useStore } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';

const Dashboard = () => (
    <Fragment>
    <Winners />
    <VoteForm />
  </Fragment>
);

export default Dashboard;
