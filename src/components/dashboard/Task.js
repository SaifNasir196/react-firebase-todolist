import React from 'react'

const Task = ({task}) => {
  return (
        <div className="task" id={task.id} style={{border:'2px solid black'}}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <button className="edit-task">Edit</button>
            <button className="delete-task">Delete</button>
        </div>
    )
}


export default Task