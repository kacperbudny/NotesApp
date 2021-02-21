import React from 'react'
import ButtonsBar from './ButtonsBar'

const Note = ({ note, onDelete }) => {
    return (
        <div className="note">
            <h3>{note.name}</h3>
            <p>{note.text}</p>
            <ButtonsBar note={note} onDelete={onDelete}/>
        </div>
    )
}

export default Note
