import { User } from '../models';

export enum TodosActionTypes {
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
        type: TodosActionTypes.LOAD_TODOS,
    };
}

export function loadingTodos(): ILoadingTodosAction {
    return {
        type: TodosActionTypes.LOADING_TODOS,
    };
}

export function loadUser(user: User): ILoadedTodosAction {
    return {
        type: TodosActionTypes.LOAD_USER,
        payload: {
            user,
        },
    };
}

export function loadingTodosFailed(): ILoadingTodosFailedAction {
    return {
        type: TodosActionTypes.LOADING_TODOS_FAILED,
    };
}

export function addTodo(description: string): IAddTodoAction {
    return {
        type: TodosActionTypes.ADD_TODO,
        payload: {
            description,
        },
    };
}

export function addingTodo(): IAddingTodoAction {
    return {
        type: TodosActionTypes.ADDING_TODO,
    };
}

export function addingTodoFailed(): IAddingTodoFailedAction {
    return {
        type: TodosActionTypes.ADDING_TODOS_FAILED,
    };
}

export interface ILoadTodosAction {
  type: TodosActionTypes.LOAD_TODOS;
}

export interface ILoadingTodosAction {
  type: TodosActionTypes.LOADING_TODOS;
}

export interface ILoadUserAction {
  type: TodosActionTypes.LOAD_USER;
  payload: {
    todos: User;
  }
}

export interface ILoadingTodosFailedAction {
  type: TodosActionTypes.LOADING_TODOS_FAILED;
}

export interface IAddTodoAction {
  type: TodosActionTypes.ADD_TODO;
  payload: {
    description: string;
  }
}

export interface IAddingTodoAction {
  type: TodosActionTypes.ADDING_TODO;
}


export interface IAddingTodoFailedAction {
  type: TodosActionTypes.ADDING_TODOS_FAILED;
}

export type TodosAction = ILoadTodosAction | ILoadingTodosAction | ILoadingTodosFailedAction | IAddTodoAction | IAddingTodoAction | IAddingTodoFailedAction;
