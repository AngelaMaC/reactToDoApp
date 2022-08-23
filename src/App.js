import { useState } from 'react'
import AddTaskForm from './Components/AddTaskForm'
import ToDo from './Components/ToDo'
import UpdateForm from './Components/UpdateForm'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {

  // *** Tasks State
  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task 1', status: false },
    { id: 2, title: 'Task 2', status: false }
  ])

  // *** Temp State
  // holds temp data that will be added as new task list
  const [newTask, setNewTask] = useState('')

  // holds the task that is being edited
  const [updateData, setUpdateData] = useState('')

  // Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1
      setToDo([
        ...toDo,
        { id: num, title: newTask, status: false }
      ])
      setNewTask('')
    }
  }

  // Delete Task
  const deleteTask = (id) => {
    setToDo(toDo.filter(task => task.id !== id))
  }

  // Complete Task
  const markComplete = (id) => {
    setToDo(toDo.map(task => task.id === id ? ({ ...task, status: !task.status }) : (task)
    ))
  }

  // Cancel Edit
  const cancelUpdate = (id) => {
    setUpdateData('')
  }

  // Change Task
  const changeHolder = (e) => {
    setUpdateData({
      ...updateData,
      title: e.target.value
    })
  }

  // Update Task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id)
    setToDo([
      ...removeOldRecord,
      updateData
    ])

    setUpdateData('')
  }

  return (
    <div className="container App">
      <h1>To Do List App</h1>

      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeHolder={changeHolder}
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

export default App
