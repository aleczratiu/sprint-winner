import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import rootReducer, { initialState } from './reducers';

export interface IState {
  todos: ITodoState;
}

export const initialState: IState = {
    todos: initialTodoState,
};

export default combineReducers({
    todos: todosReducer,
});


const store = createStore(
    initialState,
    {},
);


export default store;
