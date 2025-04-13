
import {React,useState,useEffect} from 'react'
import '../Css/Pages/Profile.css'
import ProfilePosts from '../Components/Profile/ProfilePosts'
import ProfileBiodata from '../Components/Profile/ProfileBiodata'
import axios from "axios";
import { useAuth } from '../Store/AuthContext';
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';

function Profile() { 
  const { userData } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  
    const {userId} = useParams();
    // console.log(userId)
  useEffect(() => {
    const getUserPosts = async () => {
      const token = Cookies.get('user');
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/getSinglePost/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response) {
          console.log("Response not fetched /posts/getSinglePost for user profile");
          return;
        }
        else {
          // console.log(response.data.response);
          setUserPosts(response.data.response);
        }
      }
      catch (err) {
        console.log("Error while fetching the data of users for user post" + err)
      }
    }
    getUserPosts();
  }, [userData]);


  const [loadedProfilePage, setLoadedProfilePage] = useState(false);
  // console.log(userData);
  useEffect(() => {
    setLoadedProfilePage(true);  
  }
    , []);
  
 

  return (
    <div className="dupProfileContainerLayer">
        <div className= {`profileContainerLayer ${loadedProfilePage ? 'showProfileContainerLayer':''}`}>
        <ProfileBiodata   userId={ userId} />
          
        { 
          userPosts.map((data,index) => {
            return <ProfilePosts key={index} postData={data } />
          })
          }
        
          
    </div>
    </div>
    
  )
}

export default Profile