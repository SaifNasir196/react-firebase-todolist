import React from 'react'
import { useState, useEffect, useContext } from "react";
import { auth, provider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


const AuthContext = React.createContext();


export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState();


    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        // this function is called when component is mounted
        // onAuthStateChanged returns a function that unsubscribes from the listener
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrUser(user);
        })
        return unsubscribe;
    }, [])
    


    const value = {
        currUser,
        login,
        logout,
        signup,
        loginWithGoogle,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
