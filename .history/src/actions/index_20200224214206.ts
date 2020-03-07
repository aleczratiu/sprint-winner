import { User } from '../models';

export enum ActionTypes {
    LOAD_USER = 'user/load',
}

export function loadUser(user: User): ILoadUserAction {
    return {
        type: ActionTypes.LOAD_USER,
        payload: {
            user,
        },
    };
}

export interface ILoadUserAction {
  type: ActionTypes.LOAD_USER;
  payload: {
    user: User;
  }
}

export type TodosAction = ILoadTodosAction | ILoadingTodosAction | ILoadingTodosFailedAction | IAddTodoAction | IAddingTodoAction | IAddingTodoFailedAction;
