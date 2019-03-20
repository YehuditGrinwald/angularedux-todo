
import { ITodo } from './todo-list/Itodo';
import { IUser } from './users/Iuser';

import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from './todo-list/actions';
import { ADD_USER, REMOVE_USER, TOGGLE_USER } from './users/actions';

export interface IAppState {
    users: IUser[];
    todos: ITodo[];
    lastUpdate: Date;
}
export const INITIAL_STATE: IAppState = {
    todos: [],
    users: [],
    lastUpdate: null
};

export function rootReducer(state: IAppState, action): IAppState {

    switch (action.type) {

        // TODO actions
        case ADD_TODO:
            action.todo.id = state.todos.length + 1;
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({}, action.todo)),
                lastUpdate: new Date()
            });

        case TOGGLE_TODO:
            const todo = state.todos.find(t => t.id === action.id);
            const index = state.todos.indexOf(todo);
            return Object.assign({}, state, {
                todos: [
                    ...state.todos.slice(0, index),
                    Object.assign({}, todo, { isCompleted: !todo.isCompleted }),
                    ...state.todos.slice(index + 1)
                ],
                lastUpdate: new Date()
            });
        case REMOVE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.filter(t => t.id !== action.id),
                lastUpdate: new Date()
            });
        case REMOVE_ALL_TODOS:
            return Object.assign({}, state, {
                todos: [],
                lastUpdate: new Date()
            });

        // Users actions
        case ADD_USER:
            action.user.id = state.users.length + 1;
            return Object.assign({}, state, {
                users: state.users.concat(Object.assign({}, action.user)),
                lastUpdate: new Date()
            });

        case TOGGLE_USER:
            const user = state.users.find(u => u.id === action.id);
            const userIndex = state.users.indexOf(user);
            return Object.assign({}, state, {
                users: [
                    ...state.users.slice(0, userIndex),
                    Object.assign({}, todo, { isCompleted: !todo.isCompleted }),
                    ...state.users.slice(userIndex + 1)
                ],
                lastUpdate: new Date()
            });
        case REMOVE_USER:
            return Object.assign({}, state, {
                users: state.users.filter(t => t.id !== action.id),
                lastUpdate: new Date()
            });
    }
    return state;
}

