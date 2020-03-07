import { combineReducers } from 'redux';
import todosReducer, { InitialState, initialTodoState } from './todosReducers';

export default combineReducers({
    user: todosReducer,
});
