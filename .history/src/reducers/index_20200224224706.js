import { combineReducers } from 'redux';
import todosReducer from './todosReducers';

export default combineReducers({
    user: todosReducer,
});

import { List } from 'immutable';

const initialState = {
    elements: new List(),
    allowTopAnimation: false,
    loaded: false,
};

export default initialState;
