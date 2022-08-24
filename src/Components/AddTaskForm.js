const AddTaskForm = ({ newTask, setNewTask, addTask }) => {

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <>
            <div className='row'>
                <div className='col'>
                    <input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='form-control form-control-lg'
                    />
                </div>
                <div className='col-auto'>
                    <button
                        onClick={addTask}
                        className='btn btn-lg btn-info'
                    >Add Task</button>
                </div>
            </div>
        </>
    )
}

export default AddTaskForm