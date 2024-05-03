import React from 'react'

export const AddMode = ({
  data,
  reRender,
  setReRender,
  containers,
  setAddMode,
}) => {
  const handleSubmitAddTask = (e) => {
    e.preventDefault()
    const newTodoData = containers[0].data.concat({
      id: containers[0].data.length,
      task: e.target[0].value,
    })
    const newContainers = [...containers]
    newContainers[0].data = newTodoData
    const newData = {
      _id: data._id,
      title: data.title,
      data: newContainers,
      date: data.date,
      __v: 0,
      id: data.id,
    }
    if (e.target[0].value.length > 0) {
      fetch('http://localhost:3012/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      })
      setReRender(!reRender)
    }
  }
  return (
    <div id='add-task-modal'>
      <form
        id='add-task-form'
        onSubmit={handleSubmitAddTask}
      >
        <input
          type='text'
          placeholder='Add task'
        />
        <input
          type='submit'
          value='Save'
          id='add-task-submit'
        />
      </form>
      <button onClick={() => setAddMode(false)}>x</button>
    </div>
  )
}
