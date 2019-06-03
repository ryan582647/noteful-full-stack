import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import NotesFoldersContext from '../NotesFoldersContext'
import './Note.css'
// Un-comment the 2 imports below and un-comment lines 75-79 to see
// an example of Error Boundaries in action
//import GarbageComponent from '../GarbageComponent/GarbageComponent';
//import NoteErrorBoundary from '../ErrorBoundaries/NoteErrorBoundary';


function deleteNoteRequest(noteId, noteDeleteCallbackFunc) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      noteDeleteCallbackFunc(noteId);
      // * In our case noteDeleteCallbackFunc is context.deleteNote; We
      //   specified this below, on line 56. Function context.deleteNote
      //   is defined in App.js. It removes the note from App's state.
    })
    .catch(error => {
      console.error(error)
    })
}


export default class Note extends Component {
  static defaultProps ={
    onDeleteNote: () => {},
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
                {/* Un-comment NoteErrorBoundary to see an example of 
                Error Boundaries in action.
                <NoteErrorBoundary>
                  <GarbageComponent value={99} locale="de-DE" currency="US"/>
                </NoteErrorBoundary> */}
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