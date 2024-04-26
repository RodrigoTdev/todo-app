import React, { useState } from 'react'

export const Project = () => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverContainer, setDragOverContainer] = useState(null)

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
        (c) => c._id === dragOverContainer
      )

      draggedContainer.data = draggedContainer.data.filter(
        (item) => item !== draggedItem
      )
      droppedContainer.data.push(draggedItem)

      console.log(newContainers, 'newContainers')

      setContainers(newContainers)
      setDraggedItem(null)
      setDragOverContainer(null)
    }
  }
  return (
    <div className='dnd-container'>
      {/* {containers &&
        containers?.map((container) => (
          <div
            className='items-container'
            key={container._id}
            onDrop={handleDrop}
            onDragOver={(event) => handleDragOver(event, container._id)}
          >
            <h2>{container.title}</h2>
            {container?.data.map((item) => (
              <div
                className='item'
                key={item.id}
                draggable
                onDragStart={(event) => handleDragStart(event, item)}
              >
                {item.task}
              </div>
            ))}
          </div>
        ))} */}
    </div>
  )
}
