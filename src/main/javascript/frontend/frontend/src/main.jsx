import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppUserComponent from "./components/AppUserComponent";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppUserComponent />
  </React.StrictMode>,
)
