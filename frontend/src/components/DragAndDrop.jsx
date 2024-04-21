import React, { useState } from 'react'

export const DragAndDrop = ({ containers, setContainers }) => {
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
        c.elements.includes(draggedItem)
      )
      const droppedContainer = newContainers.find(
        (c) => c.id === dragOverContainer
      )

      draggedContainer.elements = draggedContainer.elements.filter(
        (item) => item !== draggedItem
      )
      droppedContainer.elements.push(draggedItem)

      setContainers(newContainers)
      setDraggedItem(null)
      setDragOverContainer(null)
    }
  }
  return (
    <div className='dnd-container'>
      {containers.map((container) => (
        <div
          className='items-container'
          key={container.id}
          onDrop={handleDrop}
          onDragOver={(event) => handleDragOver(event, container.id)}
        >
          <h2>{container.id}</h2>
          {container.elements.map((item) => (
            <div
              className='item'
              key={item}
              draggable
              onDragStart={(event) => handleDragStart(event, item)}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
