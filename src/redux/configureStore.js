import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Todos } from './Todo';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Todos: Todos
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}