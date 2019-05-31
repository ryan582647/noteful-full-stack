import React, { Component } from 'react'
import Note from '../Note/Note'
import NotesFoldersContext from '../NotesFoldersContext'
import './NotePageMain.css'

export default class NotePageMain extends Component {
  constructor(props) {
    super(props);
    this.jumpBack = this.jumpBack.bind(this);
  }
  static contextType = NotesFoldersContext;
  jumpBack() {
    this.props.history.push("/");
  }
  render() {
    const currentNoteId = this.props.match.params.noteId;
    const note = this.context.notes.find(item => item.id === currentNoteId)
    return (
      <section className='NotePageMain'>
        <Note handleJumpBack={this.jumpBack}
          {...note}
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
