import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Maintaner from './Maintaner'
import App from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="theRoot">
      <Maintaner />
      {/* <App/> */}
    </div>
  </StrictMode>
)
