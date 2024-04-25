import React, { useEffect, useState } from 'react'
import { DragAndDrop } from './components/DragAndDrop'

const App = () => {
  const [containers, setContainers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3012/api/data')
      .then((response) => response.json())
      .then((data) => {
        setContainers(data)
        console.log(data, 'data')
      })
  }, [])

  console.log(containers, 'containers')

  return (
    <div className='app'>
      <h1>TODO APP</h1>
      <DragAndDrop
        containers={containers}
        setContainers={setContainers}
      />
    </div>
  )
}

export default App
