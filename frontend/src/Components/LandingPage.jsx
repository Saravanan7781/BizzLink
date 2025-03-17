import React, { useState,useEffect} from 'react'
import '../Css/Components/LandingPage.css'
import { ChevronRight , ChevronLeft} from 'lucide-react';
import LandingPageImage from '../assets/alterLandingPage.jpg';

function LandingPage() {
    
    const [activeStep, setActiveStep] = useState("");

    useEffect(() => {
        console.log(activeStep)
    }, [activeStep]);
    

    const clickStep = (whichStep) => {
        setActiveStep(whichStep);
    }

    const changeSwiperLeft = (id) => {
        if (id <= 1) {
            setActiveStep(3);
        }
        else {
            setActiveStep(prevState => prevState - 1);
        }
    }

    const changeSwiperRight = (id) => {
        if (id >= 3) {
            setActiveStep(1);
        }
        else {
            setActiveStep(prevState => prevState + 1);
        }
    }

  return (
      <div className="landingPageOuter">
          <div className="landingPageInner">
              <div className="landingPageInnerLeft">
                  <div className="landingPageInnerLeftContent">
                      <h1>BizzLink</h1>
                      <p>Connecting aspiring entrepreneurs and investors</p>
                  <div className="landingPageInnerLeftButtons">
                  <button>SignUp</button>
                 <button>More info</button>
                  </div>
                  </div>
                  
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
                  <div className="swipeArrowsLeft" onClick={()=> changeSwiperLeft(activeStep)}>                    
                  <ChevronLeft size={28} strokeWidth={2} />
                  </div>
                  <div className="swipeArrowsRight" onClick={() =>
                      changeSwiperRight(activeStep)
                  }>                    
                  <ChevronRight size={28} strokeWidth={2} />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default LandingPage