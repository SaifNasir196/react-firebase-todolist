import React from "react";
import { useState, useRef } from 'react';
import { auth, provider } from '../../config/firebase';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const LogIn = () => {
    let navigate = useNavigate(); 

    // states
    const [loading, setLoading] = useState(false);

    // create refs
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login, loginWithGoogle, currUser } = useAuth();



    const handleSubmit = async e => {
        e.preventDefault();
        try{
            setLoading(true)
            console.log(emailRef.current.value, passwordRef.current.value);
            await login(emailRef.current.value, passwordRef.current.value);
            console.log('user logged in');
            navigate('/');
        } catch(err) { // TODO: handle case if no account exists
            console.error(err);
        setLoading(false)
        }
    };

    const handleSubmitWithGoogle = async e => {
        e.preventDefault();
        try {
            setLoading(true)
            await loginWithGoogle(auth, provider);
            console.log('user logged in');
            navigate('/');
        } catch(err) {
            console.error(err);
        setLoading(false)
        }
    };

    // console.log(auth?.currentUser?.email); // to get logged in user


    return (
        <div className="container">
            <div className="image login-img">
                <img alt="anonymous" />
            </div>

            <div>

                <svg> logo </svg>
                current user: {currUser?.email}

                <p> Nice to see you again</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" ref={emailRef} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" ref={passwordRef} />
                    </div>
                    <div className="input-group">
                        <button disabled={loading} type="submit">Log In</button>
                    </div>
                </form>

                    <hr />
                    <div className="input-group">
                        <button disabled={loading} onClick={handleSubmitWithGoogle}>Log In with Google</button>
                    </div>

                <p>Don't have an account? <Link to='/signup'>Sign up</Link> </p>
            </div>
            
            
            
        </div>
    );
}

export default LogIn;