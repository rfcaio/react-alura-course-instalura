import React from 'react'

import PostActions from './PostActions'
import PostHeader from './PostHeader'
import PostInfo from './PostInfo'

const Post = () => (
  <div>
    <PostHeader />
    <img alt="" src="https://via.placeholder.com/500" />
    <PostInfo />
    <PostActions />
  </div>
)

export default Post
