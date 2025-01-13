import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log("jo")

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="theRoot">
      <App />
    </div>
  </StrictMode>
)
