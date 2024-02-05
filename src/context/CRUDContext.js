import React from 'react'
import { useContext } from "react";
import { db, auth } from '../config/firebase.js';
import { collection, getDocs, query, where, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext.js';


const CRUDContext = React.createContext();

export const useCRUD = () => {
    return useContext(CRUDContext);
}

export const CRUDProvider = ({ children }) => {

    const { currUser } = useAuth();
    const tasksCollection = collection(db, 'tasks'); // reference to collection in firestore

    const addTask = async (title, description, type) => {
        try {
            const userId = auth?.currentUser?.uid
            await addDoc(tasksCollection, {title, description, userId, type});
            getSpecificTasksList(type);
        } catch(err) {  
            console.error(err);
        }
    }

    const deleteTask = async (id) => {
        const task = doc(db, 'tasks', id)
        try {
            const type = task.type;
            await deleteDoc(task);
            getSpecificTasksList(type);
        } catch(err) {
            console.error(err);
        }
    }

    const editTask = async (id, title, description) => {
        const task = doc(db, 'tasks', id);
        try {
            const type = task.type;
            await updateDoc(task, {title, description});
            getSpecificTasksList(type);
        } catch(err) {
            console.error(err);
        }
    }    
  
    const getSpecificTasksList = async (name) => {
        try {
            const querySnapshot = await getDocs(query(tasksCollection, where("userId", "==", currUser.uid), where("type", "==", name)));
            const filteredData = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})); 
            console.log('filtered data',  filteredData);
            return filteredData;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CRUDContext.Provider value={{ tasksCollection, addTask, deleteTask, editTask, getSpecificTasksList }}>
            {children}
        </CRUDContext.Provider>
    )
}