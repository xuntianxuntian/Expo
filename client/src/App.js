import React from 'react'
import UserLayout from './components/userLayout/index'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './components/login/Login.component';
import {AuthRoute} from './components/utils/AuthRoute'


class App extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <AuthRoute path='/' >
            <UserLayout />
          </AuthRoute>
        </Switch>
      </Router>

    )
  }

}

export default App;
