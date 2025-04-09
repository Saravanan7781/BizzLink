import React, { useState, useEffect } from 'react';
import asta from '../../assets/business.jpg';
import { useAuth } from '../../Store/AuthContext';
import axios from "axios";
import Cookies from 'js-cookie';

function ProfileBiodata() {
    const { userData } = useAuth();
    const [upvotes, setUpvotes] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [ideas, setIdeas] = useState(0);
    const token = Cookies.get('user');

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

    // 👉 Move counter logic to top level
    const animatedUpvotes = useCounter(upvotes);
    const animatedFollowers = useCounter(followers);
    const animatedIdeas = useCounter(ideas);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/user/fetchCurrentUserData',
                    { id: userData.id },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response) {
                    console.log("Response not fetched");
                    return;
                }

                setFollowers(response.data.followers);
                setIdeas(response.data.ideas);
                setUpvotes(response.data.upvotes);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        getUserData();
    }, [userData, token]);

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
                        <h1>{Math.round(animatedUpvotes)}</h1>
                    </div>
                    <div className="profileBiodataProfileCountsInfo">
                        <h1>Followers</h1>
                        <h1>{Math.round(animatedFollowers)}</h1>
                    </div>
                    <div className="profileBiodataProfileCountsInfo">
                        <h1>Ideas</h1>
                        <h1>{Math.round(animatedIdeas)}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProfileBiodata);
