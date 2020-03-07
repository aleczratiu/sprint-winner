import { User } from '../models';

export enum ActionTypes {
    LOAD_TODOS = 'todos/load',
    LOADING_TODOS = 'todos/loading',
    LOAD_USER = 'user/load',
    LOADING_TODOS_FAILED = 'todos/loading_failed',

    ADD_TODO = 'todos/add',
    ADDING_TODO = 'todos/adding',
    ADDED_TODOS = 'todos/added',
    ADDING_TODOS_FAILED = 'todos/adding_failed'
}

export function loadTodos(): ILoadTodosAction {
    return {
        type: ActionTypes.LOAD_TODOS,
    };
}

export function loadingTodos(): ILoadingTodosAction {
    return {
        type: ActionTypes.LOADING_TODOS,
    };
}

export function loadUser(user: User): ILoadUserAction {
    return {
        type: ActionTypes.LOAD_USER,
        payload: {
            user,
        },
    };
}

export function loadingTodosFailed(): ILoadingTodosFailedAction {
    return {
        type: ActionTypes.LOADING_TODOS_FAILED,
    };
}

export function addTodo(description: string): IAddTodoAction {
    return {
        type: ActionTypes.ADD_TODO,
        payload: {
            description,
        },
    };
}

export function addingTodo(): IAddingTodoAction {
    return {
        type: ActionTypes.ADDING_TODO,
    };
}

export function addingTodoFailed(): IAddingTodoFailedAction {
    return {
        type: ActionTypes.ADDING_TODOS_FAILED,
    };
}

export interface ILoadTodosAction {
  type: ActionTypes.LOAD_TODOS;
}

export interface ILoadingTodosAction {
  type: ActionTypes.LOADING_TODOS;
}

export interface ILoadUserAction {
  type: ActionTypes.LOAD_USER;
  payload: {
    user: User;
  }
}

export interface ILoadingTodosFailedAction {
  type: ActionTypes.LOADING_TODOS_FAILED;
}

export interface IAddTodoAction {
  type: ActionTypes.ADD_TODO;
  payload: {
    description: string;
  }
}

export interface IAddingTodoAction {
  type: ActionTypes.ADDING_TODO;
}


export interface IAddingTodoFailedAction {
  type: ActionTypes.ADDING_TODOS_FAILED;
}

export type TodosAction = ILoadTodosAction | ILoadingTodosAction | ILoadingTodosFailedAction | IAddTodoAction | IAddingTodoAction | IAddingTodoFailedAction;
