import React from "react";
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';


const LogIn = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const LogInUser = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, pass)
            console.log('user logged in');
        } catch(err) {
            console.error(err);
        }
    };

    const signUpUserWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch(err) {
            console.error(err);
        }
    };

    console.log(auth?.currentUser?.email); // to get logged in user
    return (
        <div className="container">
            <div className="image login-img">
                <img alt="anonymous" />
            </div>

            <div>

                <svg> logo </svg>
                <p> Nice to see you again</p>
                <div className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email"  onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" onChange={e => setPass(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <button  onClick={LogInUser}>Log In</button>
                    </div>
                    <hr />
                    <div className="input-group">
                        <button onClick={signUpUserWithGoogle}>Log In with Google</button>
                    </div>
                </div>

                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
            
            
            
        </div>
    );
}

export default LogIn;