import { combineReducers } from 'redux';
import todosReducer, { InistialState, initialTodoState } from './todosReducers';

export interface UserState {
  user: InistialState;
}

export const initialState: UserState = {
    user: initialTodoState,
};

export default combineReducers({
    user: todosReducer,
});
