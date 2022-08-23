import { useState } from 'react';
import AddTaskForm from './Components/AddTaskForm';
import ToDo from './Components/ToDo';
import UpdateForm from './Components/UpdateForm'
import 'bootstrap/dist/css/bootstrap.css';
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
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display ToDos */}
      {toDo && toDo.length ? '' : 'Add some tasks...'}
      <ToDo
        toDo={toDo}
        markComplete={markComplete}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
