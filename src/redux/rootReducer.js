import { combineReducers } from 'redux'
import { todoReducer } from './TodoRedux'

export const rootReducer = combineReducers({
    todo: todoReducer, 
})



