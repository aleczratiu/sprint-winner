import React, { useState, useContext } from 'react';
import { store } from './StateProvider';

function withAuthentication({ Component }) {
    const { state } = useContext(store);
    return <Component />
}

export default withAuthentication;
