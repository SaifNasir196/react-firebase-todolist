import React from 'react'
import IconButton from '@mui/material/Button';
import Notifications from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircle from '@mui/icons-material/AddCircle';
import Search from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useCRUD } from '../context/CRUDContext';
import { getDocs, query, where, onSnapshot } from 'firebase/firestore';
import {  } from 'firebase/firestore';



const SearchBar = () => {
    const { currUser } = useAuth();
    const { tasksCollection } = useCRUD();
    const [taskQuery, setTaskQuery] = useState("");
    const [searchResults, setSearchResults] = useState([])


    const handleSearch = async (e) => {
        e.preventDefault()
        setTaskQuery(taskQuery)
        const querySnapshot = await getDocs(query(tasksCollection, where("userId", "==", currUser.uid)));
        const unsub = onSnapshot(querySnapshot, (snapshot) => {
            setSearchResults(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
        return (unsub)
    }

    return (
        <>
            <form>
                <TextField
                    id="search-bar"
                    className="text"
                    // onInput={handleSearch}
                    label="Search tasks"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    onKeyUp={handleSearch}
                    onChange={(e)=>setTaskQuery(e.target.value)} />

                <IconButton type="submit" aria-label="search">
                    <Search style={{ fill: "blue" }} />
                </IconButton>
            </form>

            <div className="my-2">
                {searchResults && (
                                        <>
                    {searchResults.map(task => (
                    
                        <h1 key={task.id}>{task.title}</h1>
                    ))}

                    </>
                )}
            </div>
        </>
    )
}

export default SearchBar