import { User } from '../models';

export enum Actions {
    LOAD_USER = 'user/load',
}

export function loadUser(user: User): ILoadUserAction {
    return {
        type: Actions.LOAD_USER,
        payload: {
            user,
        },
    };
}

export interface ILoadUserAction {
  type: Actions.LOAD_USER;
  payload: {
    user: User;
  }
}

export type TodosAction = ILoadUserAction;
