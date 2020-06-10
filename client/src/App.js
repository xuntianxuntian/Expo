import React from 'react'
import UserLayout from './components/userLayout/index'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { Provider } from 'react-redux'
import store from './store'
import {LOGIN_IN} from './actions/types'
import setAuthorization from './utils/setAuthorization'

import { AuthRoute } from './routes/AuthRoute'
import AuthComponent from './components/auth/index.authComponent';

import axiosInterceptors from './utils/axiosInterceptors'


//axios 错误拦截器初始化  未认证重定向到'/login'
// axiosInterceptors()

if (localStorage.token) {
  const token = localStorage.token
  const decode = jwt_decode(token)
  console.log(decode)
  store.dispatch({
    type: LOGIN_IN,
    payload: decode
  })
  setAuthorization(token)
}

class App extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login'>
              <AuthComponent />
            </Route>
            <AuthRoute path='/'  >
              <UserLayout />
            </AuthRoute>
          </Switch>
        </Router>
      </Provider>
    )
  }

}

export default App;
