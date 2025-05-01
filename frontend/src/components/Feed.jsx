import React from 'react';
import Posts from './Posts';

function Feed() {
  return (
    <div className='my-8 flex flex-col items-center w-full lg:w-[90%] mx-auto'>
      <Posts />
    </div>
  );
}

export default Feed;