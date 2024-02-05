import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Dashboard from "./components/dashboard/dashboard";
import "./static/App.css"
import { AuthProvider } from "./context/AuthContext";
import { CRUDProvider } from "./context/CRUDContext";
import PrivateRoute from "./components/PrivateRoute";
import './static/App.css'

function App(){ 
    return ( 
        <AuthProvider>
            <CRUDProvider>
                <div className="App"> 
                    <Router>
                        <Routes> 
                            <Route path="/register" element={ <Auth/> } />
                            <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} /> 
                        </Routes> 
                    </Router>
                </div> 
            </CRUDProvider>
        </AuthProvider>
    )
} 
export default App 