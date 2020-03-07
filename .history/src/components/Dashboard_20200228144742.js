import React from 'react';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withAuthorization } from '../session/index';

const Dashboard = () => (
    <>
        <Winners />
        <VoteForm />
  </>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
