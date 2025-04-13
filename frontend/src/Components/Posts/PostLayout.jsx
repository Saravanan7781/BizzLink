    import {React,useState,useEffect,useRef} from 'react'
import '../../Css/Components/Posts/PostLayout.css'
import sample from '../../assets/sample.png'
import { BiSolidUpvote  } from "react-icons/bi";
import { FaShare } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import UseScrollAnimation from '../../Hooks/UseScrollAnimation';
import pic from '../../assets/sample.png';
import { MapPin} from 'lucide-react'
import { useAuth } from '../../Store/AuthContext';
import Cookies  from 'js-cookie';
import axios from 'axios';

function PostLayout({ data }) {
    
    const { _id,post_images, upvotes, post_title, post_desc, business_field, funding_range, investment_stage, business_type, location, website_link, team_size, registered_entity } = data;
    
    const renderRef = useRef(false);
    const token = Cookies.get('user');
    const { userData, url } = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    // console.log(url);
    const [userAndPostDetails, setUserAndPostDetails] = useState({
        post_id: _id,
        user_id: userData.id
    });

    const [isUpvoteClicked, setIsUpvoteClicked] = useState(false);

    const [upvoteCount, setUpvoteCount] = useState(upvotes.length);
    const [upvoteStatus, setUpvoteStatus] = useState(false);
    
    const upvoteClicked = () => {
        // console.log("from " + isUpvoteClicked.status);
        renderRef.current = true;
        setIsUpvoteClicked(prevState => !prevState);
    }


  const changeStateOfInnerLayout = (value) => {
    if (value) {
        setIsHovered(true);
    } else {
        setTimeout(() => setIsHovered(false), 10); 
    }
    };  
    
    UseScrollAnimation(); 


    useEffect(() => {
        async function triggerLikeCount() {
            // if (!renderRef.current) {
            //     return;
            // }
            
            try {
                const upvoteCountFromBackend = await axios.post(`${url}/api/posts/${userAndPostDetails.post_id}/likePost`,
                    {
                        user_id: userAndPostDetails.user_id,
                        action:!renderRef.current?"normal":"like"
                     }
                    , {
                        headers:
                        {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!upvoteCountFromBackend) {
                    console.log("Couldn't get response for upvoteCount in PostLayout.jsx");
                    return;
                }
                console.log("response from backend");
                console.log(upvoteCountFromBackend.data);
                setUpvoteCount((prevState) => upvoteCountFromBackend.data.upvotes);
                setUpvoteStatus((prevState)=>upvoteCountFromBackend.data.status);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        triggerLikeCount();
    }
        , [isUpvoteClicked]); 
    
  return (
      <>
          <div className="outerLayoutForProfile" onMouseEnter={() => changeStateOfInnerLayout(true)} onMouseLeave={ () =>changeStateOfInnerLayout(false)}>
              <div className="wholeLayerForAnimation">
                  
            
            <div className="innerLayout1">
                <div className="userPostDescriptionStart">
                    <div className="userDetails">
                    <img className="userProfile" src={pic } alt="" />
                    <p className="username">{ "hi"}</p>
                          </div>
                          <div className="businessTypeInUserPost">
                              Business Type: { business_type}
                     </div>
            </div>
              

              <div className="imageByUser">
                  <img src={post_images[0]} alt="uchichaMadara"/>
                      </div>
                      
                 <div className="mainFooterOfThePostLayout">
                          <div className="footerOfPostLayout">
                  
                      <div className="overallInsights">
                      <div className="upvoteContent iconsContent">
                        
                                      {
                                                upvoteStatus?
                                              <BiSolidUpvote style={{ color: "red" }}
                                                  onClick={ upvoteClicked}  
                                                size={28} />
                                              :
                                              <BiSolidUpvote style={{ color: "white" }}
                                                  onClick={ upvoteClicked}
                                                  size={28} />
                                      }
                          
                      </div>
                      <p>{ upvoteCount}</p>
                          
                      </div>

                      <div className="messagePerson iconsContent">
                  <AiOutlineMessage style={{ color: "white" }} size={26} />
                      </div>

                      {/* <div className="shareCotent iconsContent">
                  <FaShare style={{ color: "white" }} size={26} />
                      </div> */}
                          <div className="web">
                  <FaShare style={{ color: "white" }} size={26} />
                      </div> 

                          </div>
                          
                          <div className="sideFooterForLocation">
                              <MapPin /><p>{ location}</p>
                          </div>
                    </div>
              
              </div>
            
                      <div className={`innerLayout2 ${isHovered ? 'visible' : ''}`}>
                          <div className="captionByUser">
                          <div className="investmentStageFromPosts">
                               Stage: {investment_stage}
                          </div>
                         <div className="fundingRangeInPost"> Funding Range { "23000 - 3400000     "}</div>
                      </div>
                      
                          {isHovered && (
                          <div className="contentByUser">
                      
                      <p className="CaptionOfTheContent">
                              
                              
                              <p>{ post_title}</p>
                        </p>
                      
                              <p className="realContent">
                                  { post_desc}
                                </p>
                  </div>
                            )
                      }
                     
                  <div className="footerOfTheContent">
                      <i>{business_field}</i>
                  </div>
                  </div>
                  </div>
          </div>
      </>
  )
}

export default PostLayout


