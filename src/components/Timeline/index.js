import React from 'react'

import Post from '../Post'

class Timeline extends React.Component {
  constructor () {
    super()
    this.state = { posts: [] }
  }

  componentDidMount () {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/vitor')
      .then(response => response.json())
      .then(posts => {
        this.setState(() => ({ posts }))
      })
      .catch(error => console.error(error))
  }

  render () {
    return (
      <section>
        {
          this.state.posts.map(post => <Post key={post.id} info={post} />)
        }
      </section>
    )
  }
}

export default Timeline
