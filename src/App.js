import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {

  // *** Tasks State
  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task 1', status: false },
    { id: 2, title: 'Task 2', status: false }
  ]);

  // *** Temp State
  // holds temp data that will be added as new task list
  const [newTask, setNewTask] = useState('');

  // holds the task that is being edited
  const [updateData, setUpdateData] = useState('');

  // Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  // Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks)
  }

  // Complete Task
  const markComplete = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask)
  }

  // Cancel Edit
  const cancelUpdate = (id) => {
    setUpdateData('');
  }

  // Change Task
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // Update Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">
      <h1>To Do List App</h1>

      {/* Update Task */}
      <div className='row'>
        <div className='col'>
          <input
            value={updateData && updateData.title}
            onChange={(e) => changeTask(e)}
            className='form-control form-control-lg'
          />
        </div>
        <div className='col-auto'>
          <button
            onClick={updateTask}
            className='btn btn-lg btn-success mr-20'

          >Update</button>
          <button className='btn btn-lg btn-warning'>Cancel</button>
        </div>
      </div>

      {/* Add Task */}
      <div className='row'>
        <div className='col'>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='form-control form-control-lg'
          />
        </div>
        <div className='col-auto'>
          <button
            onClick={addTask}
            className='btn btn-lg btn-success'
          >Add Task</button>
        </div>
      </div>

      {/* Display ToDos */}
      {toDo && toDo.length ? '' : 'Your work is done here!'}

      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>

              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
                </div>
                <div className='iconsWrap'>
                  <span title='Completed / Not Completed'
                    onClick={(e) => markComplete(task.id)}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {task.status ? null : (
                    <span title='Edit'
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span title='Delete'
                    onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }

    </div>
  );
}

export default App;
