import React from 'react';
import Container from '@material-ui/core/Container';
import Winners from './Winners';
import VoteForm from './VoteForm';
import { withAuthorization } from '../session/index';

const Dashboard = () => (
    <>
    <Winners />
    <Container maxWidth="md">
        <VoteForm />
    </Container>
    </>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
