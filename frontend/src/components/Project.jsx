import React, { useEffect, useState } from 'react'

export const Project = ({
  data,
  currentProject,
  reRender,
  setReRender,
  setCurrentProject,
}) => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverContainer, setDragOverContainer] = useState(null)
  const [containers, setContainers] = useState()
  const [addMode, setAddMode] = useState(false)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setContainers(currentProject.data)
  }, [currentProject.data])

  const handleDragStart = (event, item) => {
    // event.preventDefault()
    setDraggedItem(item)
  }

  const handleDragOver = (event, container) => {
    event.preventDefault()
    setDragOverContainer(container)
  }
  const handleDrop = () => {
    if (draggedItem && dragOverContainer >= 0) {
      const newContainers = [...containers]
      const draggedContainer = newContainers.find((c) =>
        c.data.includes(draggedItem)
      )
      const droppedContainer = newContainers.find(
        (c) => c.id === dragOverContainer
      )
      console.log(draggedContainer, 'draggedContainer')
      console.log(droppedContainer, 'droppedContainer')

      draggedContainer.data = draggedContainer.data.filter(
        (item) => item !== draggedItem
      )
      droppedContainer.data.push(draggedItem)
      // Update item IDs within each container
      newContainers.forEach((container) => {
        container.data = container.data.map((item, index) => {
          return {
            ...item,
            id: index,
          }
        })
      })
      setContainers(newContainers)
      setDraggedItem(null)
      setDragOverContainer(null)

      // Send updated data to server
      const newData = {
        _id: data._id,
        title: data.title,
        data: newContainers,
        date: data.date,
        __v: 0,
        id: data.id,
      }
      fetch('http://localhost:3012/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      })
    }
  }

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
      // setAddMode(false)
    }
  }

  const handleClickDeleteTask = (event, id, container) => {
    event.preventDefault()
    const newContainer = {
      ...container,
      data: container.data.filter((item) => item.id !== id),
    }

    const newDataTasks = data.data.map((container) => {
      if (container.id === newContainer.id) {
        return newContainer
      } else {
        return container
      }
    })

    const newData = {
      _id: data._id,
      title: data.title,
      data: newDataTasks,
      date: data.date,
      __v: 0,
      idMio: data.idMio,
    }

    fetch('http://localhost:3012/api/tasks/delete', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    setCurrentProject(newData)
    // setReRender(!reRender)
  }

  return (
    <div className='dnd-container'>
      {containers &&
        containers?.map((container) => (
          <div
            className='items-container'
            key={container.title}
            onDrop={handleDrop}
            onDragOver={(event) => handleDragOver(event, container.id)}
          >
            <h2 id={`${container.title.replace(' ', '-')}`}>
              {container.title}
            </h2>
            {container?.data.map((item) => (
              <div
                className={`item item-${container.title.replace(' ', '-')}`}
                key={item.task}
                draggable
                onDragStart={(event) => handleDragStart(event, item)}
              >
                {item.task}
                {editMode && (
                  <button
                    onClick={() =>
                      handleClickDeleteTask(event, item.id, container)
                    }
                    className='delete-task'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='19'
                      height='19'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fill='#dc2626'
                        d='m8.746 8l3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1l-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1l3.1 3.1a.527.527 0 1 0 .746-.746zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16'
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            {container.title === 'TODO' && !addMode && (
              <button
                onClick={() => setAddMode(true)}
                className='add-item'
              >
                +
              </button>
            )}
            {container.title === 'TODO' && addMode && (
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
            )}
            <button
              onClick={() => setEditMode(!editMode)}
              className='edit-mode-tasks'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path
                  fill='#000000'
                  d='M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6.525q.5 0 .75.313t.25.687q0 .375-.262.688T11.5 5H5v14h14v-6.525q0-.5.313-.75t.687-.25q.375 0 .688.25t.312.75V19q0 .825-.587 1.413T19 21zm4-7v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662l-8.6 8.6q-.275.275-.637.438t-.763.162H10q-.425 0-.712-.288T9 14m12.025-9.6l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z'
                />
              </svg>
            </button>
          </div>
        ))}
    </div>
  )
}
