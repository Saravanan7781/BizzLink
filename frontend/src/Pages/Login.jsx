import React from 'react';
import '../Css/Pages/Login.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

function Login() {
  async function handleGoogleSuccess(response) {
    try {
      const responseFromBackend = await axios.post('http://localhost:5000/api/user/google/login', {
        userData: response.credential, 
      });

     
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }

  // Handle Google Sign-In Failure
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

            <button className="normalSignUp">SignUp</button>
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
