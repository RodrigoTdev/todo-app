import React, { useState } from 'react'

const DragAndDropContainer = () => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ])

  const handleDragStart = (e, index) => {
    setDraggedItem(items[index])
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDragOver = (index) => {
    const draggedOverItem = items[index]

    if (draggedItem === draggedOverItem) return

    const itemsCopy = [...items]
    const draggedItemIndex = itemsCopy.indexOf(draggedItem)
    itemsCopy.splice(draggedItemIndex, 1)
    itemsCopy.splice(index, 0, draggedItem)

    setItems(itemsCopy)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
          style={{
            padding: '8px',
            margin: '8px',
            border: '1px solid #ccc',
            backgroundColor: draggedItem === item ? '#f0f0f0' : 'transparent',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default DragAndDropContainer
