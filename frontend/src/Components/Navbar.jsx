import React from 'react'
import '../Css/Components/Navbar.css'
import { Outlet, Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAuth } from '../Store/AuthContext'

function Navbar() {
  const {userData,setUserData} = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    setUserData(null);
    Cookies.remove('user');
    navigate('/login');
  };
  // console.log(userData)
  return (
    <div className="navbarForFlex">
      <div className="originalNavbar">
        <ul className="listOfNavs">
          <Link to="/posts">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/pitch">Pitch</Link>
          <Link to="/about">About</Link>
          <Link onClick={ handleLogout} to="/login">Logout</Link>
         
        </ul>
      </div>
      <div className="secondPartNav secondPartOfNavbar" >
        {userData && <Link to={`/profile/${userData.id}`} >Profile</Link>}
      </div>
    </div>
  )
}

export default Navbar