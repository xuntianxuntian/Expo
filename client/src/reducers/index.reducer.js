import { combineReducers } from 'redux'

import { loginReducer } from './auth/login.reducer'
import { registerReducer } from './auth/register.reducer'
import { registerToLogin } from '../reducers/auth/registerToLogin.reducer'
import { toogleSiderBar } from './toogleSiderBar.reducer'
import { isLoading } from './loading.reducer'

export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    toLogin: registerToLogin,
    toogleSiderBar,
    loading:isLoading
})