import {createStore, applyMiddleware,compose } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/combineReducers';
import { createBrowserHistory } from 'history'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory()
export const store=createStore(reducers(history),composeEnhancers(
    applyMiddleware(logger)
)
)
        