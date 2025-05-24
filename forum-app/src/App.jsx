import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route,} from "react-router-dom"; /* Library for routing between pages */
import "./App.css"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx"
import PostPage from "./pages/PostPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EditPage from "./pages/EditPage";


function App() {
  
  return(
  <> 
  <div className="app-container">
  {/* BrowserRouter enable routing without page reloading: */}
  <BrowserRouter>
  
  <Header/>
  <main className="main-content"> 
  <Routes>
    <Route path="/" element={<HomePage />} />
    
    <Route path="/create" 
    element={
    <RequireAuth>
    <CreatePage />
    </RequireAuth>
    } 
    />
    
    <Route path="/post/:id" element={<PostPage />} />
    <Route path="/edit/:id" element={<EditPage />} />
    
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    
   {/*  <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} /> */}
  </Routes>
  </main>
  <Footer/>
  </BrowserRouter>
</div>
  
  </>
  ) 
  
}

export default App
