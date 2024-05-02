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
  const [deleteMode, setDeleteMode] = useState(false)
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

  const handleClickTasksChanges = (event, container) => {
    event.preventDefault()

    // filter only text inputs
    const inputs = Object.values(event.target).filter((item) => {
      if (item.type === 'text') {
        return item
      }
    })
    const inputsValues = inputs.map((item) => item.value)
    const newContainerData = container.data.map((item, index) => {
      return { ...item, task: inputsValues[index] }
    })
    const newContainer = {
      ...container,
      data: newContainerData,
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
      idMio: data.idMio,
      __v: 0,
    }

    if (event.target[0].value.length > 0) {
      fetch('http://localhost:3012/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      })
    }
    setCurrentProject(newData)
    setEditMode(false)
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
            {!editMode &&
              container?.data.map((item) => (
                <div
                  className={`item item-${container.title.replace(' ', '-')}`}
                  key={item.task + item.id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, item)}
                >
                  {item.task}
                  {deleteMode && (
                    <button
                      onClick={() =>
                        handleClickDeleteTask(event, item.id, container)
                      }
                      className='delete-task'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
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
            {editMode && (
              <form
                className='edit-mode-form-tasks'
                onSubmit={() => handleClickTasksChanges(event, container)}
              >
                {container?.data.map((item) => (
                  <input
                    className='edit-mode-tasks-input'
                    key={item.task + item.id}
                    type='text'
                    defaultValue={item.task}
                  />
                ))}
                <input
                  className='save-tasks-changes'
                  type='submit'
                  value='Save'
                />
              </form>
            )}
            {container.title === 'TODO' && !addMode && !editMode && (
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
            <div className='footer-tasks-buttons'>
              <button
                className='edit-mode-tasks'
                onClick={() => setEditMode(!editMode)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='#059669'
                    d='M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h7.18q.25 0 .374.159t.125.341q0 .183-.128.341q-.128.159-.378.159H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192h12.77q.23 0 .423-.192q.192-.193.192-.423V11.11q0-.25.159-.375t.341-.125q.183 0 .341.125t.159.375v7.275q0 .69-.462 1.152q-.463.463-1.153.463zM10 13.192v-1.136q0-.323.13-.628q.132-.305.349-.522l8.465-8.466q.166-.165.348-.228q.183-.064.385-.064q.188 0 .368.064q.18.063.326.21L21.483 3.5q.16.165.242.364q.083.2.083.401t-.06.382q-.061.18-.227.345l-8.523 8.523q-.217.218-.522.351q-.305.134-.628.134h-1.04q-.348 0-.578-.23q-.23-.23-.23-.578m10.813-8.907l-1.111-1.17zM11 13h1.092l6.666-6.665l-.546-.547l-.61-.584L11 11.806zm7.212-7.212l-.61-.584zl.546.547z'
                  />
                </svg>
              </button>
              <button
                onClick={() => setDeleteMode(!deleteMode)}
                className='delete-mode-tasks'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19'
                  height='19'
                  viewBox='0 0 16 16'
                >
                  <path
                    fill='#e11d48'
                    fillRule='evenodd'
                    d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16'
                    clipRule='evenodd'
                  />
                  <path
                    fill='#e11d48'
                    d='M11.854 4.854a.5.5 0 0 0-.707-.707L8 7.293L4.854 4.147a.5.5 0 1 0-.707.707L7.293 8l-3.146 3.146a.5.5 0 0 0 .707.708L8 8.707l3.147 3.147a.5.5 0 0 0 .707-.708L8.708 8z'
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
