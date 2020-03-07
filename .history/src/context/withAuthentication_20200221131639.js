import React, { useContext, useEffect } from 'react';
import { store } from './StateProvider';

function WithAuthentication({ Component }) {
    const { state } = useContext(store);

    useEffect(() => {
        if (!state.user) {
            return null;
        }
    }, [state.user])

    return <Component />
}

export default WithAuthentication;
