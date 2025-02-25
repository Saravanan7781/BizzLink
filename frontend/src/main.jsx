import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Maintaner from './Maintaner'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="theRoot">
      <Maintaner />
    </div>
  </StrictMode>
)
