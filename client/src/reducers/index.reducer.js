import { combineReducers } from 'redux'

import {loginReducer} from './auth/login.reducer'
import errorReducer from './auth/error.reducer'

export default combineReducers({
    login:loginReducer,
})