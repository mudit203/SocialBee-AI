import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'


function Posts() {
  const { posts } = useSelector(store => store.post);

  return (
    <div>
      {posts.map((post, index) => 
         <Post key={post?._id} post={post} /> 
      )}
    </div>
  );
}

export default Posts
