import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addTodo = (todo) => ({
    type: ActionTypes.ADD_TODO,
    payload: todo
});

export const addTodos = (todos) => ({
    type: ActionTypes.ADD_TODOS,
    payload: todos
});

export const updateTodo = (todo) => ({
    type: ActionTypes.UPDATE_TODO,
    payload: todo
});

export const postTodo = (task, status)=>(dispatch)=>{
    const newTodo = {
        task: task,
        status: status,
        user_id: JSON.parse(localStorage.getItem("user"))._id
    }
    
    return fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            // response.status means error code (300, 400, 404) samjhe :)
            var error = new Error("Error " + response.status + ": " + response.statusText);
            console.log(response);
            console.log(error.response);
            error.response = response;
            throw error;            
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addTodo(response)))
    .catch((error)=>{ console.log("Post Todo : ", error.message);
                      alert('Your Todo could not be posted\nError: '+error.message)
                    })
}


export const fetchTodos = () => (dispatch) => {
    dispatch(todosLoading(true));

    return fetch("/api/todos/" + JSON.parse(localStorage.getItem("user"))._id,
    {
        method: "GET",
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache': 'no-cache'
        },
        credentials: "same-origin"  
      })
    .then(response => {
        console.log("response");
        console.log(response)
        if(response.ok){
            return response;
        }
        else{
            // response.status means error code (300, 400, 404) samjhe :)
            var error = new Error("Error " + response.status + ": " + response.statusText);
            console.log(response);
            console.log(error.response);
            error.response = response;
            throw error;            
        }
    },
    error => {
        
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(todos =>{
        dispatch(addTodos(todos))
    })
    .catch((error)=>{
        dispatch(todosFailed(error.message))
    })
}

export const removeTodo = (id) => (dispatch) => {

    return fetch("/api/todos/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        credentials : "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            // response.status means error code (300, 400, 404) samjhe :)
            var error = new Error("Error " + response.status + ": " + response.statusText);
            console.log(response);
            console.log(error.response);
            error.response = response;
            throw error;            
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {
                        console.log(response);
                        dispatch(deleteTodo(response))
                      })
    .catch((error)=>{ console.log("Delete Todo : ", error.message);
                      alert('Your Todo could not be Deleted\nError: '+error.message)
                    })
}

export const updateStatus = (id, status) => (dispatch) => {

    return fetch("/api/todos/" + id, {
        method: "PUT",
        body: JSON.stringify({status: status}),
        headers: {
            "Content-Type": "application/json"
        },
        credentials : "same-origin"
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            // response.status means error code (300, 400, 404) samjhe :)
            var error = new Error("Error " + response.status + ": " + response.statusText);
            console.log(response);
            console.log(error.response);
            error.response = response;
            throw error;            
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(updateTodo(response)))
    .catch((error)=>{ console.log("Post Todo : ", error.message);
                      alert('Your Todo could not be posted\nError: '+error.message)
                    })
}

export const deleteTodo = (todo) => ({
    type: ActionTypes.DELETE_TODO,
    payload: todo
})


export const todosLoading = () => ({
    type: ActionTypes.TODOS_LOADING
})

export const todosFailed = (errmess) => ({
    type: ActionTypes.TODOS_FAILED,
    payload: errmess
})




