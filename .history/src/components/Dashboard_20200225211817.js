import React from 'react';
import { useSelector } from 'react-redux';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withFirebase } from '../firebase/index';
import { withAuthorization } from '../session/index';

const Dashboard = () => (
  <div>
      <Winners />
      <VoteForm />
    </div>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
