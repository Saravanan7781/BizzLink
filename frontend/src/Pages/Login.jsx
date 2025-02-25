import React from 'react'
import '../Css/Pages/Login.css'

function Login() {
  return (
      <div className="outerLoginContainer">
          <div className="loginFormOuter">
              <div className="loginForm">
                  <p>Ready to start your <br/>success story with us?</p>
                  <p>Login to our website and start your journey  </p>

                  <div className="loginFormInputDetails">
                  <input type="text" placeholder="name"/>
                  <input type="email" placeholder="email" />
                      <input type="password"
                      placeholder="password"/>
                  </div>
                    <button className="normalSignUp">
                      SignUp
                </button>    
                  <p>or</p>
                  <div className="signUpWithGoogle">
                  
                </div>    
              </div>
              
              
              
          </div>
    </div>
  )
}

export default Login