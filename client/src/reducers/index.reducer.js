import { combineReducers } from 'redux'

import {loginReducer} from './auth/login.reducer'

export default combineReducers({
    login:loginReducer
})