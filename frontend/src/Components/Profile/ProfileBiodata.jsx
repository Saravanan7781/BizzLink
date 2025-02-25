import React from 'react'
import asta from '../../assets/man.webp'
import { useState,useEffect} from 'react'

function ProfileBiodata() {
  
    const counterCalc = (target) => {
        // console.log("hi da lavade")
        
        const [count, setCount] = useState(0);
        const intervalTime = 25;
        const duration = 1500;
        const steps = Math.ceil(duration / intervalTime);
        const stepSize = target / steps;

        useEffect(() => {
            if (count >= target) return;
            // useState(0);
            const interval = setInterval(() => {
                setCount((prev) => {
                    const next = prev + stepSize;
                    // console.log(next)
                    return (next >= target) ? target : next;
                })
            }, intervalTime);
        
            return () => {
                clearInterval(interval);
            }
        }, [count, duration, target]);
        
        return count;
    }
  

  return (
      <div className="profileBiodata">
          <div className="profileBiodataPicture">
              <img src={asta} alt="" />
          </div>

          <div className="profileBiodataInfo">
              <div className="profileBiodataUsername">
                  <h1>SARAVANAN S</h1>
                  <button>Follow</button>
              </div>

              <div className="profileBiodataProfileCounts">
                  <div className="profileBiodataProfileCountsInfo">
                      <h1>Upvotes</h1>
                      <h1>{ Math.round(counterCalc(11))}</h1>
                  </div>
                  <div className="profileBiodataProfileCountsInfo">
                      <h1>Followers</h1>
                      <h1>{ Math.round(counterCalc(90))}</h1>
                      
                  </div>
                  <div className="profileBiodataProfileCountsInfo">
                      
                      <h1>Ideas</h1>
                      <h1>{ Math.round(counterCalc(100))}</h1>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default ProfileBiodata