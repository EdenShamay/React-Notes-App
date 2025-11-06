import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";

function Note(props) {
  // a single note

  function handleClick() {
    props.onDelete(props.id);
  }

  // send to the App 
  function handleClickToEdit(){
    props.onEdit(props.id);
  }


  return (
    <div className="note">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleClickToEdit} >
         <EditIcon/>
      </button>
    </div>
  );
}

export default Note;
