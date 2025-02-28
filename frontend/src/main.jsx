import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Maintaner from './Maintaner'
import App from './App'
import { AuthProvider } from './Store/AuthContext';
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <AuthProvider>
      {/* <App /> */}
    <div className="theRoot">
      <Maintaner />
      {/* <App/> */}
      </div>
    </AuthProvider>
    </Router>
  </StrictMode>
)
