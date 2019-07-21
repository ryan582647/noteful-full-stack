import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NotesFoldersContext from '../NotesFoldersContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteContent: '',
      noteFolder: '',
      noteNameValid: false,
      noteContentValid: false,
      noteFolderValid: false,
      formValid: false,
      validationMessages: {
        noteTitle: '',
        noteContent: '',
        noteFolder: ''
      }
    }
  }  

  updateNoteName(noteName) {
    this.setState({noteName}, () => {this.validateNoteName(noteName)});
  }

  updateNoteContent(noteContent) {
    this.setState({noteContent}, () => {this.validateNoteText(noteContent)});
  }
  
  updateNoteFolder(noteFolder) {
    this.setState({noteFolder}, () => {this.validateNoteFolder(noteFolder)});
  }

  validateNoteName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.noteTitle = 'Please type a note title';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      noteNameValid: !hasError
    }, this.formValid );
  }

  validateNoteText(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.noteContent = 'Please type some note text';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      noteContentValid: !hasError
    }, this.formValid );
  }

  validateNoteFolder(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    if(fieldValue === "empty") {
      fieldErrors.noteFolder = 'Please select a folder';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      noteFolderValid: !hasError
    }, this.formValid );
  }

  formValid() {
    this.setState({
      formValid: this.state.noteNameValid && this.state.noteContentValid && this.state.noteFolderValid
    });
  }

  static contextType = NotesFoldersContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`http://localhost:8000/notes/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[] } = this.context
    
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateNoteName(e.target.value)} />
              <ValidationError hasError={!this.state.noteNameValid} message={this.state.validationMessages.noteTitle}/>
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea id='note-content-input' name='note-content' onChange={e => this.updateNoteContent(e.target.value)} />
              <ValidationError hasError={!this.state.noteContentValid} message={this.state.validationMessages.noteContent}/>  
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' name='note-folder-id' onChange={e => this.updateNoteFolder(e.target.value)}>
                <option value="empty">...</option>
                {folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
              <ValidationError hasError={!this.state.noteFolderValid} message={this.state.validationMessages.noteFolder}/>  
            </div>
            <div className='buttons'>
              <button type='submit' disabled={!this.state.formValid}>
                Add note
              </button>
            </div>
          </NotefulForm>
      </section>
    )
  }
}
