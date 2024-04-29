import React from 'react'

export const ProjectList = ({ dataDB, setDataDB }) => {
  return (
    <aside className='project-list'>
      <h2>PROYECTS</h2>
      <ul>
        {dataDB &&
          dataDB.map((project) => <li key={project._id}>{project.title}</li>)}
        <button className='add-project'>+</button>
      </ul>
    </aside>
  )
}
