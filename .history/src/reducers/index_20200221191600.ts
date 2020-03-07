import { combineReducers } from 'redux';
import todosReducer, { UserIState, initialTodoState } from './todosReducers';

export interface IState {
  user: UserIState;
}

export const initialState: IState = {
    user: UserIState,
};

export default combineReducers({
    todos: todosReducer,
});
