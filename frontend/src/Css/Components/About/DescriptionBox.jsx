import React from 'react'

function DescriptionBox({ description: { title,desc} }) {
  // const { }
  // const { title, desc } = props;
  // const {description } = props;
  // console.log(title)
  return (
      <div className="descriptionBox">
      <h1>{ title}</h1>
      <p>{ desc}</p>
    </div>
  )
}

export default DescriptionBox