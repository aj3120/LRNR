
import { combineReducers } from 'redux'
import menuListReducer from './menuReducer';
import contentReducer from  './contentReducer';
import { connectRouter } from 'connected-react-router'
export default (history) => combineReducers({
    menuListReducer:menuListReducer,
    contentReducer:contentReducer,
    router:connectRouter(history)
})