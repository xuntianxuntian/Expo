import React from 'react'
import UserLayout from './components/userLayout/index'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import {AuthRoute} from './components/utils/AuthRoute'
import AuthComponent from './components/auth/index.authComponent';


class App extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
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

    )
  }

}

export default App;
