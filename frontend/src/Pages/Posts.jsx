import React from 'react'
import { useEffect,useState} from 'react'  
import PostLayout from '../Components/Posts/PostLayout'
import '../Css/Pages/Posts.css'
import axios from 'axios'
import Cookies from 'js-cookie'

function Posts() {

  // const  {userData}  = useAuth();
  const token = Cookies.get('user');
  const [posts, setPosts] = useState([]);
  // console.log(token);

  useEffect(() => {
    console.log(posts);
  },[posts])

  // console.log(userData)
  useEffect(() => {
    console.log("from app");
    const getAllPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/getAllPosts', {
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

 
  // {
  //   user_dp: post1,
  //     username: "saravanan._.7",
  //       posted_image: post1,
  //   upvote_count: 1000000,
  //   content_caption: "ji",
  //          post_image:"ji",
  //           content_description: blah,
  //             time_and_date_posted: "10/08/2005 ||  8:00pm"
  // }



  return (
      
    <>
      <div className="PostsStyling">
     
      {
        posts.map((datum) => {
          return (
            <PostLayout data={datum}/>
              )   
            })
      }
        </div>
            </>
  )
}

export default Posts