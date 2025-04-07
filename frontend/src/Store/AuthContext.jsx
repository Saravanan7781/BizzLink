import { useContext, createContext, useState, useEffect,useMemo } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export  const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    
        async function verifyUser() {
            
            try {
                const token = Cookies.get('user');
                if (!token) {
                    console.log("Token not found");
                    navigate('/login');
                    return;
                }
                else {
                    const response = await axios.get('http://localhost:5000/api/user/current', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    
                    // console.log(response.data);
                    setUserData(response.data);
                }
            }
            catch (err) {
                console.log("Error occured while verifying user: " + err);
                setUserData(null);
            }
    }
    
     const contextValue = useMemo(() => ({
        userData, 
        setUserData
    }), [userData]);


     useEffect(() => {
        verifyUser();
    }, [navigate]);
  

    return (    
        <AuthContext.Provider value={{userData, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
    // console.log(object)
}


export const useAuth = () => useContext(AuthContext);