import React from "react";
import { useState } from 'react';
import { auth, provider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    console.log(auth?.currentUser?.email); // to get logged in user

    const signUpUser = async () => {
        try{
            console.log('email: ', email, 'pass: ', pass, 'name: ', name);
            await createUserWithEmailAndPassword(auth, email, pass)
            console.log('user created');
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

    return (
        <div className="container">

            <div className="image signup-img">
                <img alt="anonymous" />
            </div>

            <div>
                <svg> logo </svg>
                <p> Keep track of your work</p>
                <div className="signup-form">
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Your name"  onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Your email"  onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Your password" onChange={e => setPass(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <button onClick={signUpUser}>Sign Up</button>
                    </div>
                    <hr />
                    <div className="input-group">
                        <button onClick={signUpUserWithGoogle}>Sign Up with Google</button>
                    </div>
                </div>

                <p>Already have an account? <a href="/">Log In</a></p>
            </div>
                
        </div>
    );
}

export default SignUp;