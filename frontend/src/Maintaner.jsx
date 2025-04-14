import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth} from '../src/Store/AuthContext'
import App from './App'
import Search from './Pages/Search'
import Profile from './Pages/Profile';
import About from './Pages/About';
import Login from './Pages/Login'
import Register from './Components/Signup/Register'
import EntrepreneurPitchForm from './Components/Posts/EntrepreneurPitchForm';
import Navbar from './Components/Navbar';
import LandingPage from './Components/LandingPage';
import EntrePostCreation from './Components/EntrePostCreation';

function Maintaner() {
  const { userData } = useAuth();
  return (
      <>
      {userData && <Navbar />}
      <EntrePostCreation />
      <Routes>
         
            <Route path='/landing' element={ <LandingPage />}></Route>
            <Route path="/posts" element={<App />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/login" element={ <Login/>}  />      
            <Route path="/pitch" element={ <EntrepreneurPitchForm/>}  />      
        </Routes>
      </>
  )
}

export default Maintaner;