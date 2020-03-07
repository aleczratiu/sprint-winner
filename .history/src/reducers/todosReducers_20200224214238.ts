import produce from 'immer';
import { ApiStatus, User } from '../models';
import { Actions, ActionTypes } from '../actions/index';

export const initialTodoState: ITodoState = {
    loadingStatus: ApiStatus.LOADING,
    addingStatus: ApiStatus.LOADED,
    user: null,
};

export default function todosReducer(state: ITodoState = initialTodoState, action: TodosAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case ActionTypes.LOAD_TODOS:
            case ActionTypes.LOADING_TODOS:
                draft.loadingStatus = ApiStatus.LOADING;
                break;

            case ActionTypes.LOADING_TODOS_FAILED:
                draft.loadingStatus = ApiStatus.FAILED;
                break;

            case ActionTypes.LOAD_USER:
                draft.loadingStatus = ApiStatus.LOADED;
                draft.todos = action.payload.todos;
                break;

            case ActionTypes.ADD_TODO:
            case ActionTypes.ADDING_TODO:
                draft.addingStatus = ApiStatus.LOADING;
                break;

            case ActionTypes.ADDING_TODOS_FAILED:
                draft.addingStatus = ApiStatus.FAILED;
                break;

            case ActionTypes.ADDED_TODOS:
                draft.todos.push(action.payload.todo);
                break;
            default:
                break;
        }
    });
}

export interface ITodoState {
  loadingStatus: ApiStatus;
  addingStatus: ApiStatus;
  user: User|null;
}
