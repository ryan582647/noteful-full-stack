import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotesFoldersContext from '../NotesFoldersContext'
import ValidationError from '../ValidationError/ValidationError';
import './AddFolder.css'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
      folderNameValid: false,
      formValid: false,
      validationMessages: {
        folderName: ''
      }
    }
  }  

  updateFolderName(folderName) {
    this.setState({folderName}, () => {this.validateFolderName(folderName)});
  }

  validateFolderName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.noteTitle = 'Please type a folder name';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      folderNameValid: !hasError
    }, this.formValid );
  }

  formValid() {
    this.setState({
      formValid: this.state.folderNameValid
    });
  }

  static contextType = NotesFoldersContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`http://localhost:9090/folders/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' onChange={e => this.updateFolderName(e.target.value)}/>
            <ValidationError hasError={!this.state.noteNameValid} message={this.state.validationMessages.noteTitle}/>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
