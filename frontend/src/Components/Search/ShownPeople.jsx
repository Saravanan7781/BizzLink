import React from 'react'


//react memo used to skip the re-rendering of the compo if the prop isnt changed

const ShownPeople = (({ data }) => {
  // console.log(data);
  const { img, name, followers, upvotes } = data;
  // console.log(name)
  return (
    <>
      <div className="visiblePerson">
        <div className="profilePic">
          <img src={img} alt="coming soon"/>
        </div>
        <div className="profileDescription">
          <div className="profileDescriptionUserName">
            <p>{name}</p>
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