import produce from 'immer';
import { ApiStatus, User } from '../models';
import { Actions, ActionTypes } from '../actions/index';

export default function todosReducer(state: InitialState = initialTodoState, action: Actions) {
    return produce(state, (draft) => {
        switch (action.type) {
            case ActionTypes.LOAD_USER:
                draft.data = action.payload.user;
                break;
            default:
                break;
        }
    });
}
