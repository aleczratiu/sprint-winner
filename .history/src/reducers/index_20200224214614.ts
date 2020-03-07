import { combineReducers } from 'redux';
import todosReducer, { ITodoState, initialTodoState } from './todosReducers';

export interface IState {
  user: ITodoState;
}

export const initialState: IState = {
    user: initialTodoState,
};

export default combineReducers({
    user: todosReducer,
});
