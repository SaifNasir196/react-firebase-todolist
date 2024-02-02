import React from "react";
import { useState, useRef } from 'react';
import { auth } from '../../config/firebase';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const SignUp = () => {
    let navigate = useNavigate(); 

    // states
    const [loading, setLoading] = useState(false);

    // create refs
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const { signup, loginWithGoogle, currUser, logout } = useAuth();


    const handleSubmit = async e => {
        e.preventDefault();
        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return alert('Passwords do not match');
        }
        try{
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            console.log(emailRef.current.value, passwordRef.current.value);
            console.log('user created');
            console.log('in signup ' + auth?.currentUser?.email); // to get logged in user
            navigate('/');
        } catch(err) { // TODO: handle case if account exists
            console.error(err);
        }
        setLoading(false)
    };

    const handleSubmitWithGoogle = async e => {
        e.preventDefault();
        try{
            setLoading(true)
            await loginWithGoogle();
            console.log('user created');
            navigate('/');
        } catch(err) {
            console.error(err);
        }
        setLoading(false)
    }

    const handleLogOut = async e => {
        e.preventDefault();
        try{
            setLoading(true)
            await logout();
            console.log('user logged out');
        } catch(err) {
            console.error(err);
        }
        setLoading(false)
    }

    return (
        <div className="container">

            <div className="image signup-img">
                <img alt="anonymous" />
            </div>

            <div>
                <svg> logo </svg>
                current user: {currUser?.email}
                <p> Keep track of your work</p>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Your name" ref={nameRef} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Your email" ref={emailRef} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Your password" ref={passwordRef}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Your password" ref={confirmPasswordRef}/>
                    </div>
                    <div className="input-group">
                        <button disabled={loading} type="submit" > Sign Up </button>
                    </div>
                </form>
                
                <hr />
                <div className="input-group">
                    <button disabled={loading} onClick={handleSubmitWithGoogle}>Sign Up with Google</button>
                </div>

                <div className="input-group">
                    <button disabled={loading} onClick={handleLogOut}>Log out</button>
                </div>

                <p>Already have an account? <Link to='/login'>Log in</Link> </p>
            </div>
                
        </div>
    );
}

export default SignUp;