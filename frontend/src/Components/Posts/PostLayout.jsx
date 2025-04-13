    import {React,useState,useEffect} from 'react'
import '../../Css/Components/Posts/PostLayout.css'
import sample from '../../assets/sample.png'
import { BiSolidUpvote  } from "react-icons/bi";
import { FaShare } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import UseScrollAnimation from '../../Hooks/UseScrollAnimation';
import pic from '../../assets/sample.png';
import { MapPin} from 'lucide-react'

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
    
    const { post_images, upvotes, post_title, post_desc, business_field, funding_range, investment_stage, business_type, location, website_link, team_size, registered_entity } = data;
    
    // console.log(post_images[0])
    // console.log(post_image);
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
                          <BiSolidUpvote style={{ color: "#f14545" }} size={28} />
                          
                      </div>
                      <p>{ upvotes}</p>
                          
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


