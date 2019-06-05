import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Currency extends Component{
    static defaultProps = {
        locale: '',
        currency: '',
        value: 0
    }

    render() {
        const money = new Intl
        .NumberFormat(this.props.locale,
            {
              style: 'currency',
              currency: this.props.currency
            })
        .format(this.props.value);

        return (
            <span className="currency">
              { money }
            </span>
          )    
        }
}

Currency.propTypes = {
  locale: PropTypes.string,
  currency: PropTypes.string,
  value: PropTypes.number
};