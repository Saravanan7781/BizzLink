import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import Search from './Pages/Search'
import Profile from './Pages/Profile';
import About from './Pages/About';
import Login from './Pages/Login'
import Register from './Components/Signup/Register'
import EntrepreneurPitchForm from './Components/Posts/EntrepreneurPitchForm';
import Navbar from './Components/Navbar';
import LandingPage from './Components/LandingPage';
function Maintaner() {
  return (
      <>
    <Navbar/>
    <Routes>
        <Route path='/' element={ <LandingPage />}></Route>
            <Route path="/posts" element={<App />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/login" element={ <Login/>}  />      
    
            <Route path="/pitch" element={ <EntrepreneurPitchForm/>}  />      
        </Routes>
      </>
  )
}

export default Maintaner;