import React from 'react'
import { useNavigate} from 'react-router-dom'
//react memo used to skip the re-rendering of the compo if the prop isnt changed

const ShownPeople = (({ data }) => {
  const { img, username, followers, upvotes, _id } = data;
  const navigate = useNavigate();  

  const handleClick = () => {
    console.log("handleclick used")
    navigate(`/profile/${_id}`);
  }

  return (
    <>
      <div className="visiblePerson" onClick={ handleClick}>
        <div className="profilePic">
          <img src={img} alt="coming soon" />
        </div>
        <div className="profileDescription">
          <div className="profileDescriptionUserName">
            <p>{username}</p>
          </div>
          <div className="profileDescriptionUserData">
            <div className="profileDescriptionUserData1">
              <p>Followers</p>
              <p>{followers}</p>
            </div>
            <div className="profileDescriptionUserData2">
              <p>Upvotes</p>
              <p>{upvotes} </p>
            </div>
            <div className="profileDescriptionUserData3">
              <p>Ideas</p>
              <p>{upvotes}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default ShownPeople