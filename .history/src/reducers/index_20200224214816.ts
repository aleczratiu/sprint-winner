import { combineReducers } from 'redux';
import todosReducer, { InitialState, initialTodoState } from './todosReducers';

export interface UserState {
  user: InitialState;
}

export const initialState: UserState = {
    user: initialTodoState,
};

export default combineReducers({
    user: todosReducer,
});
