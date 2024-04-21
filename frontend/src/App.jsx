import React, { useState } from 'react'
import { DragAndDrop } from './components/DragAndDrop'

const App = () => {
  const [containers, setContainers] = useState([
    { id: 'TODO', elements: ['item1', 'item2', 'item3'] },
    { id: 'IN PROGRESS', elements: [] },
    { id: 'DONE', elements: [] },
  ])

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
