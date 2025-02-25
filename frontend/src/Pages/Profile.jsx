
import {React,useState,useEffect} from 'react'
import '../Css/Pages/Profile.css'
import ProfilePosts from '../Components/Profile/ProfilePosts'
import ProfileBiodata from '../Components/Profile/ProfileBiodata'

function Profile() { 

  const [loadedProfilePage, setLoadedProfilePage] = useState(false);

  useEffect(() => {
    // window.scrollY = 0;
    setLoadedProfilePage(true);  
  }
    , []);
  
 

  return (
    <div className="dupProfileContainerLayer">
        <div className= {`profileContainerLayer ${loadedProfilePage ? 'showProfileContainerLayer':''}`}>
          <ProfileBiodata />
          <ProfilePosts />
          <ProfilePosts />
    </div>
    </div>
    
  )
}

export default Profile