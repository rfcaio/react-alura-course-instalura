import PubSub from 'pubsub-js'
import React from 'react'

class PostActions extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isLiked: this.props.info.likeada }
  }

  addComment (event) {
    event.preventDefault()
    let token = window.localStorage.getItem('token')
    fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.info.id}/comment?X-AUTH-TOKEN=${token}`, {
      body: JSON.stringify({ texto: this.comment.value }),
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      method: 'POST'
    })
      .then(response => response.ok ? response.json() : Promise.reject('Could not comment.'))
      .then(comment => {
        PubSub.publish('UPDATE_COMMENTS', { id: this.props.info.id, comment })
      })
      .catch(error => {
        window.alert(error)
      })
  }

  like (event) {
    event.preventDefault()
    let token = window.localStorage.getItem('token')
    fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.info.id}/like?X-AUTH-TOKEN=${token}`, {
      method: 'POST'
    })
      .then(response => response.ok ? response.json() : Promise.reject('Could not like.'))
      .then(info => {
        this.setState(state => ({ isLiked: !state.isLiked }))
        PubSub.publish('UPDATE_LIKES', { id: this.props.info.id, info })
      })
      .catch(error => {
        window.alert(error)
      })
  }

  render () {
    return (
      <section>
        <a href="#" onClick={event => { this.like(event) }}>{this.state.isLiked ? 'Unlike' : 'Like'}</a>
        <form onSubmit={event => { this.addComment(event) }}>
          <input type="text" ref={input => { this.comment = input }} />
          <input type="submit" value="Comment!" />
        </form>
      </section>
    )
  }
}

export default PostActions
