import React from 'react'
import UserLayout from './components/userLayout/index'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './components/login/Login.component';


class App extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <UserLayout />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>

    )
  }

}

export default App;
