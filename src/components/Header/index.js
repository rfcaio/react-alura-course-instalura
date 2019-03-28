import PubSub from 'pubsub-js'
import React from 'react'

class Header extends React.Component {
  constructor () {
    super()
  }

  onSubmit (event) {
    event.preventDefault()
    let searchFilter = this.searchInput.value
    fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${searchFilter}`)
      .then(response => response.ok ? response.json() : Promise.reject('Could not search.'))
      .then(posts => {
        PubSub.publish('UPDATE_TIMELINE', { posts })
      })
      .catch(error => {
        window.alert(error)
      })
  }

  render () {
    return (
      <header>
        <h1>Instalura</h1>
        <form onSubmit={event => { this.onSubmit(event) }}>
          <input name="search" ref={input => { this.searchInput = input }} type="text" />
          <input type="submit" value="Search" />
        </form>
      </header>
    )
  }
}

export default Header
