import React from 'react';
import '../Css/Pages/Login.css';
import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

function Login() {
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const SignIn = async () => {
    console.log("Normal sign in clicked");
    let email = document.querySelector('input[type="email"]').value;
    let password = document.querySelector('input[type="password"]').value;
    if (!email || !password) {
      console.log("Please fill all the fields");
      return;
    }

    console.log("email: ", email);
    console.log("password: ", password);
    setUserData((prevState)=>({
      ...prevState,
      email: email,
      password: password,
    }));
    console.log(userData);
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
              <input type="text" placeholder="name" />
              <input type="email" placeholder="email" />
              <input type="password" placeholder="password" />
            </div>

            <button className="normalSignUp" onClick={SignIn}>SignUp</button>
            <p>or</p>

            <div className="signUpWithGoogle">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            </div>

          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
