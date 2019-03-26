import React from 'react'
import { browserHistory } from 'react-router'

class Logout extends React.Component {
  componentWillMount () {
    window.localStorage.removeItem('token')
    browserHistory.push('/')
  }

  render () {
    return null
  }
}

export default Logout
