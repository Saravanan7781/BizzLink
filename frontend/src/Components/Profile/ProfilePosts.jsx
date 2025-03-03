import React from 'react'
import PostLayout from '../Posts/PostLayout'

function ProfilePosts( {postData} ) {
  

  return (
      <div className="profilePosts">
      <div className="profilePostPreview">
        <PostLayout data={ postData}/>
      </div>
    </div>
  )
}

export default ProfilePosts