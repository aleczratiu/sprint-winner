import produce from 'immer';
import { ApiStatus, User } from '../models';
import { Actions, ActionTypes } from '../actions/index';

export const initialTodoState: InitialState = {
    loadingStatus: ApiStatus.LOADING,
    addingStatus: ApiStatus.LOADED,
    user: null,
};

export default function todosReducer(state: InitialState = initialTodoState, action: Actions) {
    return produce(state, (draft) => {
        switch (action.type) {
            case ActionTypes.LOAD_USER:
                draft.loadingStatus = ApiStatus.LOADED;
                draft.user = action.payload.user;
                break;
            default:
                break;
        }
    });
}

export interface InitialState {
  data: User|null;
}
