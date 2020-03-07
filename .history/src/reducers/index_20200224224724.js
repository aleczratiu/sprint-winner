import { combineReducers } from 'redux';
import todosReducer from './todosReducers';

export default combineReducers({
    user: todosReducer,
});

import { List } from 'immutable';

const initialState = {
    user: null,
};

export default initialState;
