import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import NotesFoldersContext from '../NotesFoldersContext'
import './Note.css'
//import GarbageComponent from '../GarbageComponent/GarbageComponent';
import NoteErrorBoundary from '../ErrorBoundaries/NoteErrorBoundary';

//below probably has to be changed, will rework when database is active
function deleteNoteRequest(noteId, noteDeleteCallbackFunc) {
  fetch(`https://shrouded-falls-76226.herokuapp.com/api/notes/${noteId}`, {
    method: 'DELETE',
    mode: 'cors', // no-cors, cors, *same-origin
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: noteId
    })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw new Error(error)
        })
      }
      return res
    })
    .then(notNeeded => {
      noteDeleteCallbackFunc(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}


export default class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => { },
  }
  render() {
    return (
      <NotesFoldersContext.Consumer>
        {(context) => (
          <div className='Note'>
            <h2 className='Note__title'>
              <Link to={`/note/${this.props.id}`}>
                {this.props.name}
              </Link>
            </h2>
            <button className='Note__delete' type='button'
              onClick={() => {
                this.props.onDeleteNote();
                deleteNoteRequest(
                  this.props.id,
                  context.deleteNote,
                )
              }}>
              <FontAwesomeIcon icon='trash-alt' />
              {' '}
              remove
            </button>
            <div className='Note__dates'>
              <div className='Note__dates-modified'>
                Modified
                {' '}
                <span className='Date'>
                  {format(this.props.modified, 'Do MMM YYYY')}
                </span>

              </div>
            </div>
          </div>
        )}
      </NotesFoldersContext.Consumer>
    )
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.string,
  modified: PropTypes.string,
  name: PropTypes.string
};