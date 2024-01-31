import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Dashboard from "./components/dashboard/dashboard";
import "./static/App.css"
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App(){ 
    return ( 
        <AuthProvider>
            <div className="App"> 
                <Router>
                    <Routes> 
                        <Route path="/login" element={ <LogIn/> } /> 
                        <Route path="/signup" element={ <SignUp/> } />
                        <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} /> 
                    </Routes> 
                </Router>
            </div> 
        </AuthProvider>
    )
} 
export default App 