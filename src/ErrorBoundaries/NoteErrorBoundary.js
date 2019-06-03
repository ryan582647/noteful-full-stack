import React, { Component, Fragment } from 'react';

export default class NoteErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
          return (
            <Fragment>
              <span>&nbsp;&nbsp;Could not display this content.</span>
            </Fragment>
          );
        }
        return this.props.children;
      } 
}