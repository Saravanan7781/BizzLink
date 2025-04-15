import React from 'react'
import PostLayout from '../Posts/PostLayout'

function ProfilePosts( {postData,setIsUpvotedFromPostLayout} ) {
  
  // console.log(setIsUpvotedFromPostLayout);
  return (
      <div className="profilePosts">
      <div className="profilePostPreview">
        <PostLayout data={postData} setIsUpvotedFromPostLayout={ setIsUpvotedFromPostLayout} />
      </div>
    </div>
  )
}

export default ProfilePosts