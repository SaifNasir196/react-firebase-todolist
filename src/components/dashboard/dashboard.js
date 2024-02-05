import React from "react";
// import { useState, useEffect } from "react";
import TaskList from "./TaskList.js";
import Navbar from "../Navbar.js";
import { Grid } from "@mui/material";


const Dashboard = () => {
    console.log('at dashboard');

    return (
        
        <div className="dashboard">
            {/* navbar */}
            <Navbar />
            

            {/* dashboard body */}
            <Grid container direction={'row'} className="dashboard-body" justifyContent={'center'} gap={10} mt={5} mb={5} >
                <TaskList name="urgimp"/>
                <TaskList name="urgunimp"/>
                <TaskList name="nonurgimp"/>
                <TaskList name="nonurgunimp" />

            </Grid>

        </div>
    )


}

export default Dashboard
