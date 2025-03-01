import React, { useState, useEffect } from 'react';
import asta from '../../assets/business.jpg';
import { useAuth } from '../../Store/AuthContext';

function ProfileBiodata() {
    

    const useCounter = (target) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const intervalTime = 25; 
            const duration = 1500; 
            const steps = Math.ceil(duration / intervalTime);
            const stepSize = target / steps;

            const interval = setInterval(() => {
                setCount((prev) => (prev + stepSize >= target ? target : prev + stepSize));
            }, intervalTime);

            return () => clearInterval(interval);
        }, [target]);

        return count;
    };

    // Separate counters for each stat
    const upvotes = useCounter(11);
    const followers = useCounter(90);
    const ideas = useCounter(100);

    return (
        <div className="profileBiodata">
            <div className="profileBiodataPicture">
                <img src={asta} alt="Loading image" />
            </div>

            <div className="profileBiodataInfo">
                <div className="profileBiodataUsername">
                    <h1>SARAVANAN S</h1>
                    <button>Follow</button>
                </div>

                <div className="profileBiodataProfileCounts">
                    <div className="profileBiodataProfileCountsInfo">
                        <h1>Upvotes</h1>
                        <h1>{Math.round(upvotes)}</h1>
                    </div>
                    <div className="profileBiodataProfileCountsInfo">
                        <h1>Followers</h1>
                        <h1>{Math.round(followers)}</h1>
                    </div>
                    <div className="profileBiodataProfileCountsInfo">
                        <h1>Ideas</h1>
                        <h1>{Math.round(ideas)}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProfileBiodata);