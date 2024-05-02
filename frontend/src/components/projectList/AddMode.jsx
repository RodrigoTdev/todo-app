import React from 'react'

export const AddMode = ({ dataDB, setAddMode, reRender, setReRender }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3012/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: e.target[0].value,
        idMio: dataDB.length,
      }),
    })
    setAddMode(false)
    setReRender(!reRender)
  }
  return (
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
  )
}
