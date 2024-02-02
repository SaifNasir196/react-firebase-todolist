import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import { auth } from "../config/firebase";

const PrivateRoute = ({ children }) => {
    const { currUser } = useAuth();
    const [authResolved, setAuthResolved] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setAuthResolved(true);
        });
        return unsubscribe;
    }, []);

    if (!authResolved) {
        // You might want to display a loading indicator here
        return null;
    }


    return currUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute; 