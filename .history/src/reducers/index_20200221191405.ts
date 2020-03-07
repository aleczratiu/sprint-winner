import { combineReducers } from 'redux';
import todosReducer, { UserIState, initialTodoState } from './todosReducers';

export interface IState {
  user: UserIState;
}

export const initialState: IState = {
    todos: initialTodoState,
};

export default combineReducers({
    todos: todosReducer,
});
