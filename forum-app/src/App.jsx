import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route,} from "react-router-dom"; /* Library for routing between pages */
import "./App.css"
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
/* import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx"; */

function App() {
  
  return(
  <> 

  {/* BrowserRouter enable routing without page reloading: */}
  <BrowserRouter>
  
  <Header/>
  
  <Routes>
    <Route path="/" element={<HomePage />} />
   {/*  <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} /> */}
  </Routes>
  
  </BrowserRouter>
  </>
  ) 
  
}

export default App
