import React, { useState } from 'react'

export const ProjectList = ({
  dataDB,
  setDataDB,
  reRender,
  setReRender,
  setCurrentProject,
}) => {
  const [addMode, setAddMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
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

    // setDataDB(itemsCopy)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)

    fetch('http://localhost:3012/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).then(() => setReRender(!reRender))
  }

  const handleSubmitEditedProjectList = (e) => {
    e.preventDefault()
    // filter only text inputs
    const inputs = Object.values(e.target).filter((item) => {
      if (item.type === 'text') {
        return item
      }
    })
    const inputsValues = inputs.map((item) => item.value)

    const newDataDB = dataDB.map((project, index) => {
      return {
        ...project,
        title: inputsValues[index],
      }
    })
    fetch('http://localhost:3012/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDataDB),
    }).then(() => setReRender(!reRender))
    setEditMode(false)
  }

  return (
    <aside className='project-list'>
      <h2>PROYECTS</h2>
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
          <form
            className='form-edit-project-list'
            onSubmit={handleSubmitEditedProjectList}
          >
            {dataDB.map((project) => (
              <input
                className='edit-project-title'
                type='text'
                defaultValue={project.title}
                key={project._id}
              />
            ))}
            <input
              className='save-project-titles'
              type='submit'
              value='Save'
            />
          </form>
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
      <div className='footer-buttons'>
        <button
          className='edit-mode-projets'
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
          className='delete-mode-projects'
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
    </aside>
  )
}
