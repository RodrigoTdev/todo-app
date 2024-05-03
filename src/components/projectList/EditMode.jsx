import React from 'react'

export const EditMode = ({ dataDB, setEditMode, reRender, setReRender }) => {
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
  )
}
