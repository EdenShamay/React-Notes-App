import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(true);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

 useEffect(() => {
    if (props.noteToEdit) {
      setNote({
        title: props.noteToEdit.title,
        content: props.noteToEdit.content
      });
    }
  }, [props.noteToEdit]);

  function submitNote(event) {
    if (note.title.trim() != "" || note.content.trim() != "") {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
      setIsSubmitted(true);
      event.preventDefault();
    } else {
      setIsSubmitted(false);
    }
  }

  

  function error() {
    return (
      <Alert severity="error" className="error-alert">
        <AlertTitle>Error</AlertTitle>
        Fill at least one of the fields.
      </Alert>
    );
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
        {isSubmitted == true ? null : error()}
      </form>
    </div>
  );
}

export default CreateArea;
