import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import NotesFoldersContext from '../NotesFoldersContext'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };
  setFoldersNotes = values => {
    this.setState(
      {...values}
    )
  }

  addFolder = (folder) => {
    let newFolderState = [...this.state.folders, folder];
    this.setState({folders: newFolderState});
  }

  addNote = (note) => {
    let newNoteState = [...this.state.notes, note];
    this.setState({notes: newNoteState});
  }

  deleteNote = noteID => {
    const newNotes = this.state.notes.filter(n =>
      n.id !== noteID
    )
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    let apiRequest1 = fetch('https://shrouded-falls-76226.herokuapp.com/api/folders').then(function (response) {
      return response.json()
    });
    let apiRequest2 = fetch('https://shrouded-falls-76226.herokuapp.com/api/notes').then(function (response) {
      return response.json()
    });

    let combinedData = {
      "folders": {}, "notes": {}
    };
    
    Promise.all([apiRequest1, apiRequest2]).then(function (values) {
        combinedData["folders"] = values[0];
        combinedData["notes"] = values[1];
        return combinedData;
      }).then(data=>{
        this.setFoldersNotes(data)
      })
  }

    renderNavRoutes() {
      return (
        <>
          {['/', '/folder/:folderId'].map(path =>
            <Route exact path={path}
              key={path}
              component={NoteListNav}
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageNav}
          />
          <Route
            path='/add-folder'
            component={NotePageNav}
          />
          <Route
            path='/add-note'
            component={NotePageNav}
          />
        </>
      )
    }

    renderMainRoutes() {
      return (
        <>
          {['/', '/folder/:folderId'].map(path =>
            <Route exact path={path}
              key={path}
              component={NoteListMain}
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageMain}
          />
          <Route
            path='/add-folder'
            component={AddFolder}
          />
          <Route
            path='/add-note'
            component={AddNote}
          />
        </>
      )
    }

    render() {
      const contextValue = {
        notes: this.state.notes,
        folders: this.state.folders,
        addNote: this.addNote,
        deleteNote: this.deleteNote,
        addFolder: this.addFolder,
      }
      return (
        <NotesFoldersContext.Provider value={contextValue}>
          <div className='App'>
            <nav className='App__nav'>
              {this.renderNavRoutes()}
            </nav>
            <header className='App__header'>
              <h1>
                <Link to='/'>Noteful</Link>
                {' '}
                <FontAwesomeIcon icon='check-double' />
              </h1>
            </header>
            <main className='App__main'>
              {this.renderMainRoutes()}
            </main>
          </div>
        </NotesFoldersContext.Provider>
      )
    }
  }

  export default App
