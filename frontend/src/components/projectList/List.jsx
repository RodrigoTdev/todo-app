import React, { useState } from 'react'
import { EditMode } from './EditMode'
import { AddMode } from './AddMode'

export const List = ({
  dataDB,
  reRender,
  setReRender,
  setCurrentProject,
  setDeleteMode,
  editMode,
  deleteMode,
  setEditMode,
}) => {
  const [addMode, setAddMode] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [items, setItems] = useState()
  const handleClickProject = (project) => {
    setCurrentProject(project)
  }

  const handleClickDeleteProject = (event, id) => {
    event.preventDefault()
    fetch(`http://localhost:3012/api/projects`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    })
    setReRender(!reRender)
    setDeleteMode(false)
    window.location.reload()
  }

  // Drag and Drop
  const handleDragStart = (e, index) => {
    setDraggedItem(dataDB[index])
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDragOver = (index) => {
    const draggedOverItem = dataDB[index]

    if (draggedItem === draggedOverItem) return

    const itemsCopy = [...dataDB]
    const draggedItemIndex = itemsCopy.indexOf(draggedItem)
    itemsCopy.splice(draggedItemIndex, 1)
    itemsCopy.splice(index, 0, draggedItem)
    setItems(itemsCopy)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)

    fetch('http://localhost:3012/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).then(() => setReRender(!reRender))
  }
  return (
    <ul>
      {dataDB &&
        !editMode &&
        dataDB.map((project, index) => (
          <li
            onClick={() => handleClickProject(project)}
            key={project._id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
          >
            {project.title}
            {deleteMode && (
              <button
                onClick={() => handleClickDeleteProject(event, project._id)}
                className='delete-project'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17'
                  height='17'
                  viewBox='0 0 16 16'
                >
                  <path
                    fill='#dc2626'
                    d='m8.746 8l3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1l-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1l3.1 3.1a.527.527 0 1 0 .746-.746zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16'
                  />
                </svg>
              </button>
            )}
          </li>
        ))}
      {editMode && (
        <EditMode
          dataDB={dataDB}
          setEditMode={setEditMode}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
      {!addMode && !editMode && (
        <button
          onClick={() => setAddMode(true)}
          className='add-project'
        >
          +
        </button>
      )}
      {!editMode && addMode && (
        <AddMode
          setAddMode={setAddMode}
          dataDB={dataDB}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </ul>
  )
}
