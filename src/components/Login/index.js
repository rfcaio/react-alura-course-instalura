import React from 'react'
import { browserHistory } from 'react-router'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      message: ''
    }
  }

  onSubmitForm (event) {
    event.preventDefault()
    fetch('https://instalura-api.herokuapp.com/api/public/login', {
      body: JSON.stringify({
        login: this.username.value,
        senha: this.password.value
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      method: 'POST'
    })
      .then(response => {
        return response.ok ? response.text() : Promise.reject('Could not login.')
      })
      .then(token => {
        window.localStorage.setItem('token', token)
        browserHistory.push('/timeline')
      })
      .catch(error => {
        window.alert(error)
      })
  }

  render () {
    return (
      <section>
        <form onSubmit={event => { this.onSubmitForm(event) }}>
          <div>
            <label>Username</label>
            <input type="text" ref={input => { this.username = input }} />
          </div>

          <div>
            <label>Password</label>
            <input type="password" ref={input => { this.password = input }} />
          </div>

          <input type="submit" value="Login" />
        </form>
      </section>
    )
  }
}

export default Login
