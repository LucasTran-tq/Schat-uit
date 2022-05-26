import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/auth.reducer'
import socketReducer from './reducers/socket.reducer'

const rootReducer = combineReducers({ 
    userReducer ,
    socketReducer
})

export const Store = createStore(rootReducer, applyMiddleware(thunk))
