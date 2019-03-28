import React from 'react'

import PostActions from './PostActions'
import PostHeader from './PostHeader'
import PostInfo from './PostInfo'

const Post = ({ info }) => {
  let { urlFoto } = info
  return (
    <div>
      <PostHeader info={info} />
      <img alt="" src={urlFoto} style={{ width: '500px' }} />
      <PostInfo info={info} />
      <PostActions info={info} />
    </div>
  )
}

export default Post
