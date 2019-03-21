import React from 'react'

const PostHeader = ({ info }) => {
  let { horario, loginUsuario, urlPerfil } = info
  return (
    <header>
      <figure>
        <img src={urlPerfil} />
        <figcaption>
          <a href="#">{loginUsuario}</a>
        </figcaption>
      </figure>
      <time>{horario}</time>
    </header>
  )
}

export default PostHeader
