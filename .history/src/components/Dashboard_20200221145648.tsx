import React, { Fragment } from 'react';
import Winners from './Winners';
import VoteForm from './VoteForm';

const Dashboard = () => {
  return (
    <Fragment>
      <Winners />
      <VoteForm />
    </Fragment>
  );
};

export default Dashboard;
