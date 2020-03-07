import { combineReducers } from 'redux';
import todosReducer, { UserIState, initialTodoState } from './todosReducers';
import { UserIState } from '../models';

export interface IState {
  user: UserIState;
}

export const initialState: IState = {
    user: UserIState,
};

export default combineReducers({
    todos: todosReducer,
});
