import React from "react";
import ModalEdit from './ModalEdit'

const Editor = (props) => {
    let { isParticipant, deleteRow } = props
    return(
        <ModalEdit isParticipant={isParticipant} deleteRow={deleteRow}/>
    )
}
export default Editor;