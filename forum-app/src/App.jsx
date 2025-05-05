import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route,} from "react-router-dom"; /* Library for routing between pages */
import "./App.css"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx"
import PostPage from "./pages/PostPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
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
    <Route path="/create" element={<CreatePage />} />
    <Route path="/post/:id" element={<PostPage />} />
    <Route path="/register" element={<RegisterPage />} />
    
   {/*  <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} /> */}
  </Routes>
  
  </BrowserRouter>

  <Footer/>
  </>
  ) 
  
}

export default App
