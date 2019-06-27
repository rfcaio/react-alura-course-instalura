import React from 'react'

import PostService from '../PostService'

class PostActions extends React.Component {
  addComment (event) {
    event.preventDefault()
    PostService.addComment(this.props.info.id, this.comment.value, window.localStorage.getItem('token'))
  }

  like (event) {
    event.preventDefault()
    PostService.like(this.props.info.id, window.localStorage.getItem('token'))
  }

  render () {
    return (
      <section>
        <a href="#" onClick={event => { this.like(event) }}>Like</a>
        <form onSubmit={event => { this.addComment(event) }}>
          <input type="text" ref={input => { this.comment = input }} />
          <input type="submit" value="Comment!" />
        </form>
      </section>
    )
  }
}

export default PostActions
