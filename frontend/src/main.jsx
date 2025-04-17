import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Maintaner from './Maintaner'
import App from './App'
import { AuthProvider } from './Store/AuthContext';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Register from './Components/Signup/Register'
// import { scan } from "react-scan";

// scan({
//   enabled: true,
// });

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Router>
    <div className="theRoot">
    <AuthProvider>
      <Maintaner />
    </AuthProvider>
    <Routes>
          <Route path="/register" element={ <Register/>}  />  
    </Routes>
      </div>
    </Router>
  // </StrictMode>
)
