import PubSub from 'pubsub-js'

class TimelineService {
  static getPosts (token) {
    return fetch(`https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${token}`)
      .then(response => response.json())
      .then(posts => {
        PubSub.publish('UPDATE_TIMELINE', { posts })
      })
      .catch(error => console.error(error))
  }

  static getPostByLogin (login) {
    return fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${login}`)
      .then(response => response.json())
      .then(posts => {
        PubSub.publish('UPDATE_TIMELINE', { posts })
      })
      .catch(error => console.error(error))
  }

  static subscribe (fn) {
    PubSub.subscribe('UPDATE_TIMELINE', (topic, data) => {
      fn(data)
    })
  }
}

export default TimelineService
