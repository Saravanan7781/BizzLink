import {React,useState,useEffect} from 'react'
import '../../Css/Components/Posts/PostLayout.css'
import sample from '../../assets/sample.png'
import { BiSolidUpvote  } from "react-icons/bi";
import { FaShare } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import UseScrollAnimation from '../../Hooks/UseScrollAnimation';


/* temporary data structure:
        
        1)user dp
        2)username
        3)posted image
        4)upvote count
        5)content caption
        6)content description
        7)time and date posted
*/

function PostLayout({ data }) {
    console.log(data)
    
    const { post_image, upvotes, post_title, post_desc } = data;
    
    const [isHovered, setIsHovered] = useState(false);

  const changeStateOfInnerLayout = (value) => {
    if (value) {
        setIsHovered(true);
    } else {
        setTimeout(() => setIsHovered(false), 10); 
    }
    };  
    
    UseScrollAnimation(); 
    


  return (
      <>
          <div className="outerLayout" onMouseEnter={() => changeStateOfInnerLayout(true)} onMouseLeave={ () =>changeStateOfInnerLayout(false)}>
              <div className="wholeLayerForAnimation">
                  
            
          <div className="innerLayout1">
              <div className="userDetails">
                    <img className="userProfile" src={"asd" } alt="" />
                      <p className="username">{ }</p>
              </div>

              <div className="imageByUser">
                  <img src={post_image} alt="uchichaMadara"/>
              </div>
              <div className="footerOfPostLayout">
                  
                      <div className="overallInsights">
                      <div className="upvoteContent iconsContent">
                          <BiSolidUpvote style={{ color: "#f14545" }} size={28} />
                          
                      </div>
                      <p>{ upvotes}</p>
                          
                      </div>

                      <div className="messagePerson iconsContent">
                  <AiOutlineMessage style={{ color: "white" }} size={26} />
                      </div>

                      <div className="shareCotent iconsContent">
                  <FaShare style={{ color: "white" }} size={26} />
                      </div>

              </div>
              </div>
            
                      <div className={`innerLayout2 ${isHovered ? 'visible' : ''}`}>
                          <div className="captionByUser">

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
                      <i>Uploaded on {}</i>
                  </div>
                  </div>
                  </div>
          </div>
      </>
  )
}

export default PostLayout


