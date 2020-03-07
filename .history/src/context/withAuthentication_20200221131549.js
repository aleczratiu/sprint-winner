import React, { useContext, useEffect } from 'react';
import { store } from './StateProvider';

function withAuthentication({ Component }) {
    const { state } = useContext(store);
    useEffect(() => {
        if (!state.user) {
            return null;
        }
    })
    return <Component />
}

export default withAuthentication;
