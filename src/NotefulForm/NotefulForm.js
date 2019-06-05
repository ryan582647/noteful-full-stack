import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './NotefulForm.css'


export default class NotefulForm extends Component {
  render() {
    const { className, ...otherProps } = this.props
    return (
      <form
        className={['Noteful-form', className].join(' ')}
        action='#'
        {...otherProps}
      />
    )
  }
}

NotefulForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};