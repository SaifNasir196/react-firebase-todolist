import React from "react";
import { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase.js';

import TaskList from "./TaskList.js";


const Dashboard = () => {

    return (
        
        <div className="dashboard">
            {/* dashboard header */}
            <div className="dashboard-header">
                {/* TODO: add search feature */}
                <span>search feature</span>
                <button className="add-task">Add Task</button>
                {/* notifs */}
                <button className="notifications">Notifs</button>
                {/* user account */}
                <button className="my-account">Account</button>

            </div>


            <div className="dashboard-body">
                <TaskList name="UrgImp"/>
                <TaskList name="UrgUnimp"/>
                <TaskList name="NonUrgImp"/>
                <TaskList name="NonUrgUnimp"/>

            </div>

        </div>
    )


}

export default Dashboard
