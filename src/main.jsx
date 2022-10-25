import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import './scss/styles.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter basename={"/selectionsort"}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
