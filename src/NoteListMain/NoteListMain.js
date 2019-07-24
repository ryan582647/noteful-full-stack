import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotesFoldersContext from '../NotesFoldersContext'
import './NoteListMain.css'


export default class NoteListMain extends Component {
  static contextType = NotesFoldersContext;
  render() {
    const { notes } = this.context;
    const currentFolderId = this.props.match.params.folderId;

    let atTopLevel = Object.keys(this.props.match.params).length === 0;
    const notesFiltered = (atTopLevel) ? notes : notes.filter(item => item.folder_id.toString() === currentFolderId);

    return (
      <section className='NoteListMain'>
        <ul>
          {notesFiltered.map(note =>
            <li key={note.id}>
              <Note
                id={note.id.toString()}
                name={note.note_title}
                modified={note.date_modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )    
  }
}