import React from 'react'
import ButtonsBar from './ButtonsBar'

const Note = ({ note, onDelete, onEdit }) => {
    return (
        <div className="note" onClick={(e) => onEdit(note.id)}>
            <h3>{note.name}</h3>
            <p>{note.text}</p>
            <ButtonsBar note={note} onDelete={onDelete}/>
        </div>
    )
}

export default Note
