import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'


export default class MainContentError extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        console.log('got error');
        return { hasError: true };
    }      

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
        console.log('error');
        console.log(error);
        console.log('info about error');
        console.log(info);
    }    

    render() {
        if (this.state.hasError) {      
          return (
            <Fragment>
                <h2>Could not locate this note.</h2>
                <p>Click <Link to="/">here</Link> to go back.</p>
            </Fragment>
          );
        }
        return this.props.children;
      } 
}