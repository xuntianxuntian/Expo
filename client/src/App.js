import React from 'react'
import UserLayout from './components/userLayout/index'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { Provider } from 'react-redux'
import store from './store'
import setAuthorization from './utils/setAuthorization'

import { AuthRoute } from './components/utils/AuthRoute'
import AuthComponent from './components/auth/index.authComponent';

if (localStorage.token) {
  const token = localStorage.token
  const decode = jwt_decode(token)
  console.log(decode)
  store.dispatch({
    type: "LOGIN_IN",
    payload: token
  })
  setAuthorization(token)
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login'>
              <AuthComponent />
            </Route>
            <AuthRoute path='/' >
              <UserLayout />
            </AuthRoute>
          </Switch>
        </Router>
      </Provider>
    )
  }

}

export default App;
