import React, { useState } from 'react'

export const ProjectList = ({
  dataDB,
  setDataDB,
  reRender,
  setReRender,
  setCurrentProject,
}) => {
  const [addMode, setAddMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [items, setItems] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3012/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: e.target[0].value, idMio: dataDB.length }),
    })
    setAddMode(false)
    setReRender(!reRender)
  }

  const handleClickProject = (project) => {
    setCurrentProject(project)
    // console.log(project)
  }

  const handleClickDeleteProject = (event, id) => {
    console.log(id)
    event.preventDefault()
    fetch(`http://localhost:3012/api/projects`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    })
    setReRender(!reRender)
    setEditMode(false)
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

    // setDataDB(itemsCopy)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)

    console.log(dataDB, 'dataDB')
    console.log(items, 'items')
    fetch('http://localhost:3012/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).then(() => setReRender(!reRender))
  }

  return (
    <aside className='project-list'>
      <h2>PROYECTS</h2>
      <ul>
        {dataDB &&
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
              {editMode && (
                <button
                  onClick={() => handleClickDeleteProject(event, project._id)}
                  className='delete-project'
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
            </li>
          ))}
        {!addMode ? (
          <button
            onClick={() => setAddMode(true)}
            className='add-project'
          >
            +
          </button>
        ) : (
          <div id='new-project-modal'>
            <form
              id='new-project-form'
              onSubmit={handleSubmit}
            >
              <input
                id='title-input'
                type='text'
                placeholder='Project title'
              />
              <input
                type='submit'
                id='add-project'
                value='Save'
              />
            </form>
            <button
              id='close-add-project'
              onClick={() => setAddMode(false)}
            >
              x
            </button>
          </div>
        )}
      </ul>
      <button
        onClick={() => setEditMode(!editMode)}
        className='edit-project-list'
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
    </aside>
  )
}
