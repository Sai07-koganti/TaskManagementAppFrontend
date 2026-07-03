import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import "./styles/custom.css";
import './index.css'
import { ToastContainer} from "react-toastify";
import { TaskProvider } from "./context/TaskContext";
import { UserProvider } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
const savedTheme =
  localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
} else {
  document.body.classList.add("dark-theme");
}
` `
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>
    <UserProvider>
    <TaskProvider>
      <App />
       <ToastContainer position="top-right" autoClose={2000}/>
    </TaskProvider>
    </UserProvider>
  
  </React.StrictMode>
  
)