import React, { useState } from 'react'

function App() {
  // Estado para el contenido de cada contenedor
  const [container1Items, setContainer1Items] = useState(['div1', 'div2'])
  const [container2Items, setContainer2Items] = useState(['div3', 'div4'])
  const [container3Items, setContainer3Items] = useState(['div5', 'div6'])

  console.log(container1Items)
  console.log(container2Items)
  console.log(container3Items)

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event, targetContainer) => {
    event.preventDefault()
    const draggedItem = event.dataTransfer.getData('text/plain')
    // Mover el elemento solo si el contenedor de destino es diferente al contenedor de origen
    if (draggedItem && draggedItem !== targetContainer) {
      // Actualizar el estado del contenedor de origen
      switch (draggedItem) {
        case 'div1':
        case 'div2':
          setContainer1Items(
            container1Items.filter((item) => item !== draggedItem)
          )
          break
        case 'div3':
        case 'div4':
          setContainer2Items(
            container2Items.filter((item) => item !== draggedItem)
          )
          break
        case 'div5':
        case 'div6':
          setContainer3Items(
            container3Items.filter((item) => item !== draggedItem)
          )
          break
        default:
          break
      }
      // Actualizar el estado del contenedor de destino
      switch (targetContainer) {
        case 'container1':
          setContainer1Items([...container1Items, draggedItem])
          break
        case 'container2':
          setContainer2Items([...container2Items, draggedItem])
          break
        case 'container3':
          setContainer3Items([...container3Items, draggedItem])
          break
        default:
          break
      }
    }
  }

  return (
    <div className='container'>
      <div
        id='container1'
        className='container-box'
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'container1')}
      >
        {container1Items.map((item) => (
          <div
            key={item}
            id={item}
            className='box'
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        id='container2'
        className='container-box'
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'container2')}
      >
        {container2Items.map((item) => (
          <div
            key={item}
            id={item}
            className='box'
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        id='container3'
        className='container-box'
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'container3')}
      >
        {container3Items.map((item) => (
          <div
            key={item}
            id={item}
            className='box'
            draggable
            onDragStart={(event) => handleDragStart(event, item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
