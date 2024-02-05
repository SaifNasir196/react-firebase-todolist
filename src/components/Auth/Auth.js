import React from 'react'
import { useState } from 'react'
import SignUp from './SignUp'
import LogIn from './LogIn'
import styles from './../../static/Auth.module.css'



const Auth = () => {
    const [type, setType] = useState("logIn");
    const handleOnClick = text => {
        if (text !== type){
            console.log('type is ' + type);
            setType(type)
            console.log('type changed to ' + type);
        }
    };
    console.log(type, 'type in auth.js');

    return (        
        <div className={`${styles.container} ${type == "signUp" && styles.rightPanelActive}`} id="container">
            <SignUp />
            <LogIn />
            <div className={styles.overlayContainer}>
                <div className={styles.overlay}>
                    <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                        <h1 className={styles.head1}>Welcome Back!</h1>
                        <p> To keep connected with us please login with your personal info </p>
                        <button className={`${styles.ghost} ${styles.btn}` } id="logIn" onClick={() => setType("logIn")} >
                            Sign In
                        </button>
                    </div>

                    <div className= { `${styles.overlayPanel} ${styles.overlayRight}`}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className={`${styles.ghost} ${styles.btn}` } id="signUp" onClick={() => setType("signUp")} >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Auth