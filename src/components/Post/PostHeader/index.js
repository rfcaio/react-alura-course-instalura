import React from 'react'
import { Link } from 'react-router'

const PostHeader = ({ info }) => {
  let { horario, loginUsuario, urlPerfil } = info
  return (
    <header>
      <figure>
        <img src={urlPerfil} />
        <figcaption>
          <Link to={`/timeline/${loginUsuario}`}>{loginUsuario}</Link>
        </figcaption>
      </figure>
      <time>{horario}</time>
    </header>
  )
}

export default PostHeader
