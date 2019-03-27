import React from 'react'
import { Link } from 'react-router'

const PostInfo = ({ info }) => {
  let { comentario, comentarios, likers, loginUsuario } = info
  return (
    <div>
      <div>
        {
          likers.map(({ login }, index) => <Link key={index} to={`/timeline/${login}`}>{login}</Link>)
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
            comentarios.map(({ id, login, texto }) => (
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

export default PostInfo
