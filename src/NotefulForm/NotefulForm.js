import React from 'react'
import './NotefulForm.css'
import NotesFoldersContext from '../NotesFoldersContext'


export default function NotefulForm(props) {
 console.log(props);
 function handleSubmit(e, context) {
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
        console.log(res)
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        context.addFolder(folder)
        props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  const { className, ...otherProps } = props
  return (
    <NotesFoldersContext.Consumer>
      {(context) => (
      <form
        className={['Noteful-form', className].join(' ')}
        action='#'
        {...otherProps}
        onSubmit={e => handleSubmit(e, context)}
      />
      )}
    </NotesFoldersContext.Consumer>
  )
}
