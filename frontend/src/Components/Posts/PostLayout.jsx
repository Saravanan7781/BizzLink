import {React,useState} from 'react'
import '../../Css/Components/Posts/PostLayout.css'
import sample from '../../assets/sample.png'
// import   from "react";
import { BiSolidUpvote  } from "react-icons/bi";

import { FaShare } from "react-icons/fa6";

import { AiOutlineMessage } from "react-icons/ai";


/* temporary data structure:
        
        1)user dp
        2)username
        3)posted image
        4)upvote count
        5)content caption
        6)content description
        7)time and date posted

*/

function PostLayout({data}) {
    
    const { user_dp, username, posted_image, upvote_count, content_caption ,content_description, time_and_date_posted } = data;
    const [isHovered, setIsHovered] = useState(false);

  const changeStateOfInnerLayout = (value) => {
    if (value) {
        setIsHovered(true);
    } else {
        setTimeout(() => setIsHovered(false), 10); // Match the transition duration (500ms)
    }
};


  return (
      <>
          <div className="outerLayout" onMouseEnter={() => changeStateOfInnerLayout(true)} onMouseLeave={ () =>changeStateOfInnerLayout(false)}>
              
          <div className="innerLayout1">
              <div className="userDetails">
                    <img className="userProfile" src={ user_dp} alt="" />
                      <p className="username">{username }</p>
              </div>

              <div className="imageByUser">
                  <img src={posted_image} alt="uchichaMadara"/>
              </div>
              <div className="footerOfPostLayout">
                  
                      <div className="overallInsights">
                      <div className="upvoteContent iconsContent">
                          <BiSolidUpvote style={{ color: "#f14545" }} size={28} />
                          
                      </div>
                      <p>{ upvote_count}</p>
                          
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
                              
                              
                              <p>{ content_caption}</p>
                        </p>
                      
                              <p className="realContent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum autem provident consequatur non accusantium facilis, dolores consectetur nesciunt eos explicabo dignissimos nulla, eaque facere nisi voluptates nostrum repellat ullam sint!
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis harum excepturi, tempore minima commodi omnis maxime doloribus vel expedita totam praesentium. Expedita dolore facere sint, atque esse eaque quaerat!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia expedita labore fugiat? Quia magni quisquam, delectus ab aliquid enim autem voluptatum harum. Atque fugiat neque, distinctio suscipit natus velit numquam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vero necessitatibus ullam nemo. Temporibus quis sunt tempora iste saepe nobis possimus quisquam, necessitatibus minus sequi maxime sed doloremque dolorum itaque.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum facilis id, doloremque accusantium sint libero ea odit possimus natus cum veniam, excepturi beatae aliquam facere enim quibusdam ipsa perferendis! Consequatur.
            </p>
                  </div>
                            )
                            }
                  <div className="footerOfTheContent">
                      <i>Uploaded on {time_and_date_posted}</i>
                  </div>
                      </div>
          </div>
      </>
  )
}

export default PostLayout


