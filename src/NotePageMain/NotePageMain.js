import React, { Component } from 'react';
import Note from '../Note/Note';
import NotesFoldersContext from '../NotesFoldersContext';
import './NotePageMain.css'
import MainContentError from '../MainContentError/MainContentError';

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
    const note = this.context.notes.find(item => item.id === currentNoteId)
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
          />

        <MainContentError>
          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </MainContentError>
      </section>
    )
  }
}
