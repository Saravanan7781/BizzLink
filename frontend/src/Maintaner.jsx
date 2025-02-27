import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import Search from './Pages/Search'
import Profile from './Pages/Profile';
import About from './Pages/About';
import Login from './Pages/Login'
import Register from './Components/Signup/Register'
import EntrepreneurPitchForm from './Components/Posts/EntrepreneurPitchForm';
function Maintaner() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/posts" element={<App />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/login" element={ <Login/>}  />      
            <Route path="/register" element={ <Register/>}  />      
            <Route path="/pitch" element={ <EntrepreneurPitchForm/>}  />      
        </Routes>
     </BrowserRouter>
  )
}

export default Maintaner;