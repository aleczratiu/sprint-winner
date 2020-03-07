import React, { useContext } from 'react';

const { consumer } = useContext(null);

export const withFirebase = Component => props => (
    <consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </consumer>
);

export default FirebaseContext;
