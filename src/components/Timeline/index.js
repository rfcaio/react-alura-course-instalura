import React from 'react'
import { Link } from 'react-router'

import TimelineService from './TimelineService'

import Post from '../Post'

class Timeline extends React.Component {
  constructor (props) {
    super(props)
    this.state = { posts: [] }
  }

  componentDidMount () {
    this.props.login
      ? TimelineService.getPostByLogin(this.props.login)
      : TimelineService.getPosts(window.localStorage.getItem('token'))
  }

  componentWillMount () {
    TimelineService.subscribe((data) => {
      this.setState(() => ({ posts: data.posts }))
    })
  }

  componentWillReceiveProps (props) {
    if (props.login !== undefined) {
      TimelineService.getPostByLogin(props.login)
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
