import React, { useEffect, useState } from 'react'
import { Project } from './components/Project'
import { ProjectList } from './components/ProjectList'

const App = () => {
  const [dataDB, setDataDB] = useState([])
  const [currentProject, setCurrentProject] = useState({})
  const [reRender, setReRender] = useState(false)
  const [firstRender, setFirstRender] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3012/api/data')
      .then((response) => response.json())
      .then((data) => {
        setDataDB(data)
        !firstRender && (setCurrentProject(data[0]), setFirstRender(true))
      })
  }, [reRender, firstRender])

  return (
    <div className='app'>
      <ProjectList
        dataDB={dataDB}
        setDataDB={setDataDB}
        reRender={reRender}
        setReRender={setReRender}
        setCurrentProject={setCurrentProject}
      />
      {currentProject && (
        <Project
          currentProject={currentProject}
          data={currentProject}
          reRender={reRender}
          setReRender={setReRender}
        />
      )}
    </div>
  )
}

export default App
