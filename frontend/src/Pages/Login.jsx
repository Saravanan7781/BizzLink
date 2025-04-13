import React from 'react';
import '../Css/Pages/Login.css';
import { useState,useEffect } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/extra1.jpg'


function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(
    {
      email: '',
      password: ''
    }
  );

  const changeInput = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
        ...prevState,
        [name]: value
    }));
  }

 
  const SignIn = async () => {
    console.log("Sending data", userData);
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
      console.log(response.data);
      const data = response.data;
      const { token } = data;
      Cookies.set("user", token);
      navigate('/landing');
    }
    catch (err) {
      console.log(err);
    }
  }
  

  async function handleGoogleSuccess(response) {
    try {
      // console.log(response.credential);
      const responseFromBackend = await axios.post('http://localhost:5000/api/user/google/login', {
        userData: response.credential, 
      });

     
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }

  
  function handleGoogleFailure() {
    console.error("Some error occurred while signing in with Google");
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="outerLoginContainer">
        <div className="loginFormOuter">
          <div className="loginForm">
            <p>Ready to start your <br />success story with us?</p>
            <p>Login to our website and start your journey</p>

            <div className="loginFormInputDetails">
              <input type="text" placeholder="name" name="name"  />
              <input type="email" name="email" onChange={changeInput } placeholder="email"  />
              <input type="password" name="password" placeholder="password"  onChange={changeInput }  />
            </div>

            <button className="normalSignUp" onClick={SignIn}>SignUp</button>
            <p>or</p>

            <div className="signUpWithGoogle">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} /> 
            </div>

          </div>
        </div>
        <div className="entryImageForLoginPage">
          <img src={ loginImage} alt="" />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
