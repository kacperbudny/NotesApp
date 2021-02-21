import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ButtonsBar = ({note, onDelete}) => {
    return (
        <div className="buttons-bar">
            <div className="icon-container"><FontAwesomeIcon icon={faTrashAlt} className="icon" onClick={() => onDelete(note.id)}/></div>
        </div>
    )
}

export default ButtonsBar
