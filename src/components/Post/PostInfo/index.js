import React from 'react'

const PostInfo = ({ info }) => {
  let { comentario, comentarios, likers, loginUsuario } = info
  return (
    <div>
      <div>
        {
          likers.map(({ login }, index) => <a key={index} href="#">{login}</a>)
        }
        liked that.
      </div>

      <div>
        <a href="#">{loginUsuario}</a>
        {comentario}
      </div>

      <div>
        <ul>
          {
            comentarios.map(({ id, login, texto }) => (
              <li key={id}>
                <a href="#">{login}</a>
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
