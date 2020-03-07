import { combineReducers } from 'redux';
// import { List } from 'immutable';

export const initialState = {
    data: null,
};
export default combineReducers({
    user: initialState,
});
