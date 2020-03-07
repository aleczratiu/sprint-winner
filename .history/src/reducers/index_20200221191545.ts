import { combineReducers } from 'redux';
import todosReducer, { ITodoState, initialTodoState } from './todosReducers';

export interface IState {
  user: UserIState;
}

export const initialState: IState = {
    user: initialTodoState,
};

export default combineReducers({
    todos: todosReducer,
});
