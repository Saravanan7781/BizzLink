import React, { useState, useEffect } from 'react';
import asta from '../../assets/business.jpg';
import { useAuth } from '../../Store/AuthContext';
import axios from "axios";
import Cookies from 'js-cookie';
import useCounter from '../../Hooks/ProfileCounterAnimation';
import {CloudUpload} from 'lucide-react'

function ProfileBiodata({ userId }) {
    const { url } = useAuth();
    // console.log(url);
    const [userData, setUserData] = useState({
        name:"",
        followers: 0,
        upvotes: 0,
        ideas: 0,
        img:'',
    });  
    const token = Cookies.get('user');

    // 👉 Move counter logic to top level
    const animatedUpvotes = useCounter(userData.upvotes);
    const animatedFollowers = useCounter(userData.followers);
    const animatedIdeas = useCounter(userData.ideas);


    useEffect(() => {
        console.log(userData)
    }, [userData]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.post(
                    `${url}/api/posts/fetchUserBioData`,
                    { user_id: userId },
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

                console.log("respose from new api");
                console.log(response.data);

                setUserData({
                    id: response.data.userRecord._id,
                    name: response.data.userRecord.username,
                    followers: response.data.userRecord.followers,
                    upvotes: response.data.userRecord.upvotes,
                    ideas: response.data.userRecord.ideas,
                    img:response.data.userRecord.img,
                });
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        getUserData();
    }, [token]);

    const profileUpload = async(e) => {
   const formData = new FormData();
  formData.append('image', e.target.files[0]);
  formData.append('user_id', userData.id);
  try {
    const response = await axios.post(`${url}/api/posts/setImageForUser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      }
    });
    if (!response) {
      console.log("Couldn't upload image");
      return;
    }
      setUserData((prev) => ({ ...prev, img:response.data.response }));
    console.log("response data " + response.data);
    }
  catch (err) {
    console.log(err.message);
    console.log("Couldn't upload image");
    }
}

    return (
        <div className="profileBiodata">
            <div className="profileBiodataPicture">
                {(userData.img) ? (
                <img src={userData.img} alt="Loading image" />
                ) : (
                <>
                            <input type="file" id="profileImageForInput" accept='image/*' name="profileImageForInput"
                                onChange={(e)=>profileUpload(e)} />
                    <label htmlFor="profileImageForInput" className="uploadLabel">
                                <div className="uploadIcon">
                                    <CloudUpload /></div>
                    </label>
                </>
                )}

            </div>

            <div className="profileBiodataInfo">
                <div className="profileBiodataUsername">
                    <h1>{userData.name ? userData.name :
                        <i style={{fontWeight:"200"}}>Loading Username</i>}</h1>
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
