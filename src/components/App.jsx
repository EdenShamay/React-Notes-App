import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

// warp all notes together
function App() {
  //array of all notes
  const [notes, setNotes] = useState([]);
  const [noteToEdit , setNoteToEdit] = useState(null);

   function addNote(newNote) {
    // if we are in edit mode
    if (noteToEdit !== null) { // we have note
      setNotes((prevNotes) =>
        prevNotes.map((note, index) =>
          index === noteToEdit.id ? newNote : note
        )
      );
      setNoteToEdit(null); // finish editing
    } else {
      // adding a new note
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function editNote(id) {
    const note = notes[id]; // id is the index in the array
    return setNoteToEdit({ ...note, id }); //adding id to the note 
    //after setting the noteToEdit , noteToEdit gets the values,
    // so we need to send this note to CreateNote component to gets edit 
  }

  return (
    <div className="page-container">
      <Header />
      <div className="note-container">
        <CreateArea onAdd={addNote} noteToEdit={noteToEdit}/>
        <div className="note-list">
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
