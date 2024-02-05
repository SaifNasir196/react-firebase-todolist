import React from 'react'
import IconButton from '@mui/material/Button';
import Notifications from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircle from '@mui/icons-material/AddCircle';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useCRUD } from '../context/CRUDContext'
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';

const Navbar = () => { 

    return (
       
        <AppBar position='static' sx={{border: '2px solid black'}}>
            <Toolbar sx={{border: '2px solid black', ml:1, mr:1}}> 
                <Typography variant='h6'sx={{ flexGrow: 1}}>
                    Todo List
                </Typography> 

                <Stack direction='row'>
                    <IconButton color="secondary" aria-label="Notifications">
                        <AddCircle />
                    </IconButton>
                    <IconButton color="secondary" aria-label="Notifications">
                        <Notifications />
                    </IconButton>

                    <IconButton color="secondary" aria-label="My account">
                        <AccountCircle />
                    </IconButton>
                </Stack> 

             </Toolbar>  
        </AppBar>
    )
}

export default Navbar