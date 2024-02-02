import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import { useAuth } from '../../context/AuthContext.js';


const TaskList = props => {
    // holding state on client side
    const name = props.name;
    const [taskList, setTaskList] = useState([]);
    const { currUser } = useAuth();

    // reference to db in firebase
    const tasksCollection = collection(db, name); // reference to collection in firestore

    const getTaskList = async () => {
        try{
            // get data for specific user id
            // const data = await getDocs(tasksCollection)
            const querySnapshot = await getDocs(query(tasksCollection, where("userId", "==", currUser.uid)));
            // console.log('querySnapshot: ', querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            const filteredData = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})); 
            console.log(filteredData);
            setTaskList(filteredData); // updating state
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getTaskList();
    }, [])


    return (
        <div className="task-list">
            <h2>{name}</h2>
            <div className="task-list-body">
                {taskList.map(task => {
                    return (
                        <div className="task">
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default TaskList