import { useState } from 'react';
import { auth, provider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    console.log(auth?.currentUser?.email); // to get logged in user

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, pass)
        } catch(err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch(err) {
            console.error(err);
        }
        
    };

    const logOut = async () => {
        try{
            await signOut(auth);
        } catch(err) {
            console.error(err);
        }
    };



    return (
        <div>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
            <button onClick={signIn}> Sign in</button>


            <button onClick={signInWithGoogle}>Sign in with Google</button>

            <button onClick={logOut}>Sign out</button>
        </div>
    );
}