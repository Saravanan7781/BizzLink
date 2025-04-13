import React from 'react'
import { useEffect,useState} from 'react'  
import PostLayout from '../Components/Posts/PostLayout'
import '../Css/Pages/Posts.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../Store/AuthContext'

function Posts() {


  const token = Cookies.get('user');
  const [posts, setPosts] = useState([]);
  const { url } = useAuth();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios.get(`${url}/api/posts/getAllPosts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response) {
         
          console.log("Couldn't get response for getAllPosts in App.js");
          return;
        }
        // console.log(response.data);
        setPosts(response.data);

      }
      catch (err) {
        
        console.log("Error while getting all user posts through axios" + err );
        return;
      }

    }
    getAllPosts();
  }, []);



  return (
      
    <>
      <div className="PostsStyling">
     
      {
        posts.map((datum) => {
          return (
            <div className="outerLayoutForRecommendationPost" key={datum._id}>
            <PostLayout data={datum}/>
            </div>
              )   
            })
      }
        </div>
            </>
  )
}

export default Posts