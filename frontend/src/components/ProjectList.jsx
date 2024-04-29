import React, { useState } from 'react'

export const ProjectList = ({
  dataDB,
  setDataDB,
  reRender,
  setReRender,
  setCurrentProject,
}) => {
  const [addMode, setAddMode] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3012/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: e.target[0].value }),
    })
    setAddMode(false)
    setReRender(!reRender)
  }

  const handleClickProject = (project) => {
    setCurrentProject(project)
    // console.log(project)
  }

  return (
    <aside className='project-list'>
      <h2>PROYECTS</h2>
      <ul>
        {dataDB &&
          dataDB.map((project) => (
            <li
              onClick={() => handleClickProject(project)}
              key={project._id}
            >
              {project.title}
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
                defaultValue='Test Project Added'
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
    </aside>
  )
}
