
import {Auth} from './components/Auth/auth.js';
import {db, auth} from './config/firebase.js';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';



function App() {
  const [taskList, setTaskList] = useState([]) // storing db data on client side (js)
  const tasksCollection = collection(db, 'tasks'); // reference to db in firebase

  //  new task states
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // edit task states
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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

  const onSubmitTask = async () => {
    try {
      await addDoc(tasksCollection, {title: newTitle, description: newDescription, userId: auth?.currentUser?.uid});
      getTaskList();
    } catch(err) {
      console.error(err);
    }
  };

  const deleteTask = async (id)  => {
    const task = doc(db, 'tasks', id)
    try {
      await deleteDoc(task);
      getTaskList();
    } catch(err) {
      console.error(err);
    }
  };

  const updateTask = async (id) => {
    const task = doc(db, 'tasks', id);
    try {
      await updateDoc(task, {title: editTitle, description: editDescription});
      getTaskList();
    } catch(err) {
      console.error(err);
    }
  }
  

  return (
    <div className="App">
      <h1>React-Firebase App</h1>
      <Auth/>

      <br /><br />

      <div>
        <input type="text" placeholder="Title" onChange={e => setNewTitle(e.target.value)}/>
        <input type="text" placeholder="Description"  onChange={e => setNewDescription(e.target.value)}/>
        <button onClick={onSubmitTask}>Submit</button>
      </div>

      <br /><br />

      <div>
        {taskList.map(task => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <Popup trigger=
                {<button> Edit </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                <input type='text' placeholder='new title' onChange={e => setEditTitle(e.target.value)}></input>
                                <input type='text' placeholder='new description' onChange={e => setEditDescription(e.target.value)}></input>
                            </div>
                            <div>
                                <button onClick={() => updateTask(task.id)}> Save </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <button onClick={() => deleteTask(task.id)}> Delete </button>
          </div>
        ))
        }
      </div>

      

    </div>
  );
}


export default App;
