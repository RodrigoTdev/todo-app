import React, { useState } from 'react'

import { Footer } from './Footer'
import { List } from './List'

export const ProjectList = ({
  dataDB,
  reRender,
  setReRender,
  setCurrentProject,
}) => {
  const [deleteMode, setDeleteMode] = useState(false)
  const [editMode, setEditMode] = useState(false)

  return (
    <aside className='project-list'>
      <h2>PROYECTS</h2>
      <List
        dataDB={dataDB}
        reRender={reRender}
        setReRender={setReRender}
        setCurrentProject={setCurrentProject}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <Footer
        editMode={editMode}
        setEditMode={setEditMode}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
      />
    </aside>
  )
}
