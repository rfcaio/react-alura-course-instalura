import PubSub from 'pubsub-js'
import React from 'react'
import { Link } from 'react-router'

class PostInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = { comentarios: this.props.info.comentarios, likers: this.props.info.likers }
  }

  componentWillMount () {
    PubSub.subscribe('UPDATE_COMMENTS', (topic, data) => {
      if (this.props.info.id === data.id) {
        this.setState(state => {
          return { comentarios: [...state.comentarios, data.comment] }
        })
      }
    })

    PubSub.subscribe('UPDATE_LIKES', (topic, data) => {
      if (this.props.info.id === data.id) {
        let like = this.state.likers.find(({ login }) => login === data.info.login)
        this.setState(state => {
          return {
            likers: like === undefined
              ? [...state.likers, data.info]
              : state.likers.filter(({ login }) => login !== data.info.login)
          }
        })
      }
    })
  }

  render () {
    let { comentario, loginUsuario } = this.props.info
    return (
      <div>
        <div>
          {
            this.state.likers.map(({ login }, index) => <Link key={index} to={`/timeline/${login}`}>{login} </Link>)
          }
          liked that.
        </div>

        <div>
          <Link to={`/timeline/${loginUsuario}`}>{loginUsuario}</Link>
          {comentario}
        </div>

        <div>
          <ul>
            {
              this.state.comentarios.map(({ id, login, texto }) => (
                <li key={id}>
                  <Link to={`/timeline/${login}`}>{login}</Link>
                  {texto}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default PostInfo
