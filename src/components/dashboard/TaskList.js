import React from "react";
import { useState, useEffect } from "react";
import { query, where } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import Task from "./Task.js";
import { useCRUD } from "../../context/CRUDContext.js";
import { useAuth } from "../../context/AuthContext.js";

const TaskList = props => {
    const [taskList, setTaskList] = useState([]);
    const { getSpecificTasksList } = useCRUD();

    useEffect(() => {
        getSpecificTasksList(props.name).then(tasks => setTaskList(tasks));   
    }, [])

    return (
        <div className="task-list" style={{border:'2px solid black'}}>
            <h3>{props.name}</h3>
            <div className="task-list-body">
                {taskList.map( task => <Task task={task}/> )}
            </div>
        </div>
    )
}

export default TaskList