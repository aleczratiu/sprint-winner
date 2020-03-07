import React, { useContext, useEffect } from 'react';
import { store, StateProvider } from './StateProvider';

function WithAuthentication({ Component, firebase }) {
    const { state, dispatch } = useContext(store);

    useEffect(() => {
        this.listener = firebase.auth.onAuthStateChanged(
            authUser => {
                authUser ?
                    this.setState({ authUser }) :
                    this.setState({ authUser: null });
            },
        );
        if (!state.user) {
            return null;
        }

        return () => {
            this.listener();
        }
    }, [firebase.auth, state.user]);

    return (
        <StateProvider>
            <Component />
        </StateProvider>
    );
}

export default WithAuthentication;
