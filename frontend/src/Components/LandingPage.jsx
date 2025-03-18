import React, { useState,useEffect} from 'react'
import '../Css/Components/LandingPage.css'
import { ChevronRight , ChevronLeft, Feather} from 'lucide-react';
import LandingPageImage from '../assets/alterLandingPage.jpg';

function LandingPage() {
    
    const [activeStep, setActiveStep] = useState(0);
    const [isUserClicked, setIsUserClicked] = useState(false);
    const mapSteps = [
        {id:0,title:"BizzLink",desc:["Connecting aspiring entrepreneurs and investors"]},
        {id:1,title:"Sign in ",desc:["Sign up as Entrepreneur/Investor","By giving all the required","Login as your desired user role"]},
        {id:2,title:"Pitch your ideas",desc:["Once you've logined as entrepreneur pitch your innovative ideas","And if your investor surf through all the ideas related your interested fields which are all categorised by the fields you've given"]},
        {id:3,title:"Points credibility",desc:["Increase your upvotes and followers so that you would get recommended to all other investors","Based on all your upvotes, followers and mutuals you'll be recommended to various investors","Cheers to the groundbreaking ideas and passionate investors"]}
    ]
    const totalSteps = mapSteps.length - 1;

    useEffect(() => {
        if (isUserClicked)
            return;
        const interval = setInterval(() => {
                setActiveStep(prevState => prevState % totalSteps + 1);
            }, 2500);
        
        return () => clearInterval(interval);
    }, [isUserClicked]);
    
    useEffect(() => {
        if (isUserClicked) {
            setTimeout(() => {
                setIsUserClicked(false);
            }, 15000)
        }
    }, [isUserClicked]);


    const clickStep = (whichStep) => {
        setActiveStep(whichStep);
        setIsUserClicked(true);
    }

    const changeSwiperLeft = () => {
        if (activeStep <= 0) {
            setActiveStep(3);
        }
        else {
            setActiveStep(prevState => prevState - 1);
        }
        setIsUserClicked((prevState)=>true);
    }

    const changeSwiperRight = () => {
        // console.log(id);
        if (activeStep >= 3) {
            setActiveStep(0);
        }
        else {
            setActiveStep(prevState => prevState + 1);
        }
        setIsUserClicked((prevState)=>true);
    }

  return (
      <div className="landingPageOuter">
          <div className="landingPageInner">
              <div className="landingPageInnerLeft">
                  {
                      mapSteps.filter(datum => datum.id === activeStep).map(
                          (datum,index) => (
                              <div className="landingPageContentArea">
                                  <h1>{datum.title}</h1>
                                  {/* <p>{ datum.desc}</p> */}
                                  {
                                      datum.desc.map((anotherData) =>(
                                          <div className="landingPageContentAreaInner"><Feather strokeWidth={1.25} />
                                              <p> {anotherData}</p>
                                          </div>
                                      ))
                                  }
                              </div>
                          )
                      )
                  }


                  
           </div>
              <div className="landingPageInnerRight">
                  <img src={ LandingPageImage} alt="" />
           </div>
          </div>
          <div className="landingPageSteps">
              <div className={`landingPageStep1 ${activeStep === 1 ? 'setActiveStep' : ''}`} onClick={()=>clickStep(1)}>
                  <h1>Step 1</h1>
                  <p>SignUp as Investor/Entrepreneur</p>
              </div>
              <div className={`landingPageStep2 ${activeStep === 2 ? 'setActiveStep' : ''}`} onClick={()=>clickStep(2)}>
                  <h1>Step 2</h1>
                  <p>Pitch your idea/ Read more ideas</p>
              </div>
              <div className={`landingPageStep3 ${activeStep === 3 ? 'setActiveStep' : ''}`} onClick={()=>clickStep(3)}>
                  <h1>Step 3</h1>
                  <p>Increase the networking speed</p>
              </div>
              <div className="swipeArrows">
                  <div className="swipeArrowsLeft" onClick={()=> changeSwiperLeft()}>                    
                  <ChevronLeft size={28} strokeWidth={2} />
                  </div>
                  <div className="swipeArrowsRight" onClick={() =>
                      changeSwiperRight()
                  }>                    
                  <ChevronRight size={28} strokeWidth={2} />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default LandingPage