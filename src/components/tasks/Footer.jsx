import React from 'react'

export const Footer = ({
  editMode,
  setEditMode,
  deleteMode,
  setDeleteMode,
}) => {
  return (
    <div className='footer-tasks-buttons'>
      <button
        className='edit-mode-tasks'
        onClick={() => setEditMode(!editMode)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='22'
          height='22'
          viewBox='0 0 24 24'
        >
          <path
            fill='#059669'
            d='M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h7.18q.25 0 .374.159t.125.341q0 .183-.128.341q-.128.159-.378.159H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192h12.77q.23 0 .423-.192q.192-.193.192-.423V11.11q0-.25.159-.375t.341-.125q.183 0 .341.125t.159.375v7.275q0 .69-.462 1.152q-.463.463-1.153.463zM10 13.192v-1.136q0-.323.13-.628q.132-.305.349-.522l8.465-8.466q.166-.165.348-.228q.183-.064.385-.064q.188 0 .368.064q.18.063.326.21L21.483 3.5q.16.165.242.364q.083.2.083.401t-.06.382q-.061.18-.227.345l-8.523 8.523q-.217.218-.522.351q-.305.134-.628.134h-1.04q-.348 0-.578-.23q-.23-.23-.23-.578m10.813-8.907l-1.111-1.17zM11 13h1.092l6.666-6.665l-.546-.547l-.61-.584L11 11.806zm7.212-7.212l-.61-.584zl.546.547z'
          />
        </svg>
      </button>
      <button
        onClick={() => setDeleteMode(!deleteMode)}
        className='delete-mode-tasks'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='19'
          height='19'
          viewBox='0 0 16 16'
        >
          <path
            fill='#e11d48'
            fillRule='evenodd'
            d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16'
            clipRule='evenodd'
          />
          <path
            fill='#e11d48'
            d='M11.854 4.854a.5.5 0 0 0-.707-.707L8 7.293L4.854 4.147a.5.5 0 1 0-.707.707L7.293 8l-3.146 3.146a.5.5 0 0 0 .707.708L8 8.707l3.147 3.147a.5.5 0 0 0 .707-.708L8.708 8z'
          />
        </svg>
      </button>
    </div>
  )
}
