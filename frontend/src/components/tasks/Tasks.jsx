import React, { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { AddMode } from './AddMode'

export const Tasks = ({
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

  const handleClickChangeOrder = (event, item, container) => {
    event.preventDefault()
    const array = [...container.data]

    const intercambiarElementos = (index, array) => {
      // Verificar que el índice es válido
      if (index >= 0 && index < array.length) {
        // Verificar que el elemento no es el primero
        if (index > 0) {
          // Intercambiar el elemento actual con el anterior
          let temp = array[index]
          array[index] = array[index - 1]
          array[index - 1] = temp
        }
      }
    }
    intercambiarElementos(container.data.indexOf(item), array)
    const newContainerData = {
      ...container,
      data: array,
    }
    const newContainers = data.data.map((container) => {
      if (container.id === newContainerData.id) {
        return newContainerData
      } else {
        return container
      }
    })
    const newData = {
      _id: data._id,
      title: data.title,
      data: newContainers,
      date: data.date,
      idMio: data.idMio,
      __v: 0,
    }

    fetch('http://localhost:3012/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })

    setCurrentProject(newData)

    // setContainers(newContainers)
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
                  <div
                    key={item.task + item.id}
                    className='edit-mode-tasks-container'
                  >
                    <input
                      className='edit-mode-tasks-input'
                      type='text'
                      defaultValue={item.task}
                    />
                    <button
                      className='edit-task-order'
                      onClick={() =>
                        handleClickChangeOrder(event, item, container)
                      }
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='19'
                        height='19'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='#0284c7'
                          d='M11 16h2v-4.2l1.6 1.6L16 12l-4-4l-4 4l1.4 1.4l1.6-1.6zm1 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22'
                        />
                      </svg>
                    </button>
                  </div>
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
              <AddMode
                setAddMode={setAddMode}
                containers={containers}
                data={data}
                setReRender={setReRender}
                reRender={reRender}
              />
            )}
            <Footer
              editMode={editMode}
              setEditMode={setEditMode}
              deleteMode={deleteMode}
              setDeleteMode={setDeleteMode}
            />
          </div>
        ))}
    </div>
  )
}
