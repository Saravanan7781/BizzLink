import React from 'react'
import '../Css/Components/Navbar.css'
import { Outlet, Link } from 'react-router-dom'


function Navbar() {
  return (
    <div className="navbarForFlex">
      <div className="originalNavbar">
        <ul className="listOfNavs">
          <Link to="/posts">Home</Link>
          <Link to="search">Search</Link>
          <Link to="pitch">Pitch</Link>
          <Link to="about">About</Link>
          <Link to="logout">Logout</Link>
         
        </ul>
      </div>
      <div className="secondPartNav secondPartOfNavbar" >
         <Link to="profile" >Profile</Link>
      </div>
    </div>
  )
}

export default Navbar