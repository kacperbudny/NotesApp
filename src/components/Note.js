import React from 'react'

const Note = ({ note }) => {
    return (
        <div className="note">
            <h3>{note.name}</h3>
            <p>{note.text}</p>
        </div>
    )
}

export default Note
