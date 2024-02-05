import React from "react";
import { useState, useRef } from 'react';
import { auth, provider } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TextField from '@mui/material/TextField';
import styles from '../../static/Auth.module.css';


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
            console.log("user details: ", emailRef.current.value, passwordRef.current.value);
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
    return (
        <div className = {`${styles.signInContainer} ${styles.formContainer}`}>
            <form onSubmit={handleSubmit} className={styles.formStyle} >
                <h1 className={styles.head1}>Sign in</h1>
                <div className= {styles.socialContainer}>
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>
                <span>or use your account</span>
                <TextField inputRef={emailRef} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus InputProps={{ style: { borderRadius: 10} }}/>
                <TextField inputRef={passwordRef} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" InputProps={{ style: { borderRadius: 10} }}/>

                <a href="#">Forgot your password?</a>
                <button type="submit" disabled={loading} className={styles.btn}>Sign In</button>
            </form>
        </div>
    );
}

export default LogIn;