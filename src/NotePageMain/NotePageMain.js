import React, { Component } from 'react';
import Note from '../Note/Note';
import NotesFoldersContext from '../NotesFoldersContext';
import './NotePageMain.css'

export default class NotePageMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotesFoldersContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const currentNoteId = this.props.match.params.noteId;
    const note = this.context.notes.find(item => item.id.toString() === currentNoteId)
    console.log(note);
    return (
      <section className='NotePageMain'>
            <Note
              id={note.id.toString()}
              name={note.note_title}
              modified={note.date_modified}
              onDeleteNote={this.handleDeleteNote}
              />
          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
      </section>
    )
  }
}
