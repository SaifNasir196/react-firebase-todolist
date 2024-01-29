import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";

function App(){ 
   return ( 
      <div className="App"> 
      <h1>router in use</h1>
      <Router>
            <Routes> 
                <Route path="/signup" element={ <SignUp/> } />
                <Route path="/" element={ <LogIn/> } /> 
            </Routes> 
      </Router>

    </div> 
)} 
export default App 