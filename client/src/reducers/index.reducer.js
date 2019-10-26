import { combineReducers } from 'redux'

import {loginReducer} from './auth/login.reducer'
import {registerReducer} from './auth/register.reducer'
import {registerToLogin} from '../reducers/auth/registerToLogin.reducer'

export default combineReducers({
    login:loginReducer,
    register:registerReducer,
    toLogin:registerToLogin
})