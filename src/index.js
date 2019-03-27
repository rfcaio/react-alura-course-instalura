import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Route, Router } from 'react-router'

import Header from './components/Header'
import Login from './components/Login'
import Logout from './components/Logout'
import Timeline from './components/Timeline'

const isLoggedIn = (nextState, replace) => {
  if (!nextState.params.login && window.localStorage.getItem('token') === null) {
    replace('/')
  }
}

const App = props => (
  <main>
    <Header />
    <Timeline login={props.params.login} />
  </main>
)

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login}></Route>
    <Route path="/timeline(/:login)" component={App} onEnter={isLoggedIn}></Route>
    <Route path="/logout" component={Logout}></Route>
  </Router>
), document.getElementById('root'))
