import PubSub from 'pubsub-js'
import React from 'react'
import { Link } from 'react-router'

import Post from '../Post'

class Timeline extends React.Component {
  constructor (props) {
    super(props)
    this.state = { posts: [] }
  }

  componentDidMount () {
    let token = window.localStorage.getItem('token')
    let resource = this.props.login ? `/public/fotos/${this.props.login}` : `/fotos?X-AUTH-TOKEN=${token}`
    fetch(`https://instalura-api.herokuapp.com/api${resource}`)
      .then(response => response.json())
      .then(posts => {
        this.setState(() => ({ posts }))
      })
      .catch(error => console.error(error))
  }

  componentWillMount () {
    PubSub.subscribe('UPDATE_TIMELINE', (topic, data) => {
      this.setState(() => ({ posts: data.posts }))
    })
  }

  componentWillReceiveProps (props) {
    if (props.login !== undefined) {
      fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${props.login}`)
        .then(response => response.json())
        .then(posts => {
          this.setState(() => ({ posts }))
        })
        .catch(error => console.error(error))
    }
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
