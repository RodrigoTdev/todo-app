import React, { useState } from 'react'

export const Project = ({ data }) => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverContainer, setDragOverContainer] = useState(null)
  const [containers, setContainers] = useState(data)

  // console.log(containers, 'containers')

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

      console.log(newContainers, 'newContainers')

      setContainers(newContainers)
      setDraggedItem(null)
      setDragOverContainer(null)
    }
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
            {container.title === 'TODO' && (
              <button className='add-item'>+</button>
            )}
          </div>
        ))}
    </div>
  )
}
