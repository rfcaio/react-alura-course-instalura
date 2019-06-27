import PubSub from 'pubsub-js'

class PostService {
  static addComment (id, comment, token) {
    return fetch(`https://instalura-api.herokuapp.com/api/fotos/${id}/comment?X-AUTH-TOKEN=${token}`, {
      body: JSON.stringify({ texto: comment }),
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      method: 'POST'
    })
      .then(response => response.ok ? response.json() : Promise.reject('Could not comment.'))
      .then(comment => {
        PubSub.publish('UPDATE_COMMENTS', { id, comment })
      })
      .catch(window.alert)
  }

  static like (id, token) {
    return fetch(`https://instalura-api.herokuapp.com/api/fotos/${id}/like?X-AUTH-TOKEN=${token}`, { method: 'POST' })
      .then(response => response.ok ? response.json() : Promise.reject('Could not like.'))
      .then(info => {
        PubSub.publish('UPDATE_LIKES', { id, info })
      })
      .catch(error => {
        window.alert(error)
      })
  }

  static subscribeForComments (id, fn) {
    PubSub.subscribe('UPDATE_COMMENTS', (topic, data) => {
      if (id === data.id) {
        fn(data)
      }
    })
  }

  static subscribeForLikes (id, fn) {
    PubSub.subscribe('UPDATE_LIKES', (topic, data) => {
      if (id === data.id) {
        fn(data)
      }
    })
  }
}

export default PostService
