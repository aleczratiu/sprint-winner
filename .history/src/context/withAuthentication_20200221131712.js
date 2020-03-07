import React, { useContext, useEffect } from 'react';
import { store } from './StateProvider';

function WithAuthentication({ Component }) {
    const { state } = useContext(store);

    useEffect(() => {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser ?
                        this.setState({ authUser }) :
                        this.setState({ authUser: null });
                },
            );
        if (!state.user) {
            return null;
        }
    }, [state.user])

    return <Component />
}

export default WithAuthentication;
