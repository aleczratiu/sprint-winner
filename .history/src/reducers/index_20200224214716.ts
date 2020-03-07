import { combineReducers } from 'redux';
import todosReducer, { ITodoState, initialTodoState } from './todosReducers';

export interface InistialState {
  user: ITodoState;
}

export const initialState: InistialState = {
    user: initialTodoState,
};

export default combineReducers({
    user: todosReducer,
});
