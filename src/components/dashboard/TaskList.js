import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase.js';


const TaskList = props => {
    // holding state on client side
    const name = props.name;
    const [taskList, setTaskList] = useState([]);

    // reference to db in firebase
    const tasksCollection = collection(db, 'tasks'); // reference to collection in firestore

    const getTaskList = async () => {
        try{
            const data = await getDocs(tasksCollection);
            const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id})); 
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
                            <p>{task.date}</p>
                            <p>{task.time}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default TaskList