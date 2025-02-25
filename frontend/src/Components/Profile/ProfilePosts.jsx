import React from 'react'
import PostLayout from '../Posts/PostLayout'

function ProfilePosts() {
  const data = {
    user_dp: "post1",
    username: "saravanan._.7",
    posted_image: "post1",
    upvote_count: 1000000,
    content_caption: "Topic",
    content_description: "blah",
    time_and_date_posted: "10/08/2005 ||  8:00pm"
  };

  return (
      <div className="profilePosts">
      <div className="profilePostPreview">
        <PostLayout data={ data}/>
      </div>
    </div>
  )
}

export default ProfilePosts