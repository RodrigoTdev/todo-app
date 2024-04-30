import React, { useEffect, useState } from 'react'

export const Project = ({ data, currentProject, reRender, setReRender }) => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverContainer, setDragOverContainer] = useState(null)
  const [containers, setContainers] = useState()
  const [addMode, setAddMode] = useState(false)

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
    if (draggedItem && dragOverContainer) {
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
    fetch('http://localhost:3012/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    setReRender(!reRender)
    setAddMode(false)
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
          </div>
        ))}
    </div>
  )
}
