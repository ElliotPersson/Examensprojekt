import { useState, useEffect } from "react";
import "./App.css"
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  
  return(
  <> 
  <BrowserRouter>
  
  <Header/>
  
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
  
  </BrowserRouter>
  </>
  ) 
  
}

export default App
