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
