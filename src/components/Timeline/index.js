import React from 'react'
import { Link } from 'react-router'

import Post from '../Post'

class Timeline extends React.Component {
  constructor () {
    super()
    this.state = { posts: [] }
  }

  componentDidMount () {
    let token = window.localStorage.getItem('token')
    fetch(`https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${token}`)
      .then(response => response.json())
      .then(posts => {
        this.setState(() => ({ posts }))
      })
      .catch(error => console.error(error))
  }

  render () {
    return (
      <section>
        <Link to="/logout">Logout</Link>
        {
          this.state.posts.map(post => <Post key={post.id} info={post} />)
        }
      </section>
    )
  }
}

export default Timeline
