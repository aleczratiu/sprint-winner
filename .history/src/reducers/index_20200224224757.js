import { combineReducers } from 'redux
import { List } from 'immutable';

const initialState = {
    data: null,
};
export default combineReducers({
    user: initialState,
});
