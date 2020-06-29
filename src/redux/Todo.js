import * as ActionTypes from './ActionTypes';
import { act } from 'react-dom/test-utils';

export const Todos = (state={
    isLoading: true, 
    errMess: null,
    todos: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_TODO:
            return {...state, todos: state.todos.concat(action.payload)};

        case ActionTypes.ADD_TODOS:
            var todo = action.payload;
            return {...state, isLoading: false, errMess: null, todos:action.payload}

        case ActionTypes.UPDATE_TODO:
        //    console.log(action.payload);
        //    console.log(state.todos.indexOf({"_id": action.payload._id}));
            return {...state, todos: state.todos.map((todo)=>{ return todo._id === action.payload._id ? action.payload : todo } ) };

        case ActionTypes.DELETE_TODO:
            console.log(action.payload);
        //    console.log(state.todos.indexOf({"_id": action.payload._id}));
            return {...state, todos: state.todos.filter((todo)=>{ return todo._id !== action.payload._id } ) };                

        case ActionTypes.TODOS_LOADING:
            return {...state, isLoading: true, errMess: null, todos:[]}

        case ActionTypes.TODOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, todos:[]}
        default:
            return state;
    }
}