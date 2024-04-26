import React from 'react'

export const ProjectList = ({ dataDB, setDataDB }) => {
  return (
    <aside className='project-list'>
      <ul>
        {dataDB &&
          dataDB.map((project) => <li key={project._id}>{project.title}</li>)}
      </ul>
    </aside>
  )
}
