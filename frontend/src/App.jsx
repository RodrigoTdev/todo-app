import React, { useEffect, useState } from 'react'
import { Project } from './components/Project'
import { ProjectList } from './components/ProjectList'

const App = () => {
  const [dataDB, setDataDB] = useState([])
  const [currentProject, setCurrentProject] = useState(dataDB[0])
  // console.log(dataDB, 'dataDB')
  useEffect(() => {
    fetch('http://localhost:3012/api/data')
      .then((response) => response.json())
      .then((data) => {
        setDataDB(data)
        // console.log(data, 'data')
      })
  }, [])

  return (
    <div className='app'>
      <ProjectList
        dataDB={dataDB}
        setDataDB={setDataDB}
      />
      <Project currentProject={currentProject} />
    </div>
  )
}

export default App
