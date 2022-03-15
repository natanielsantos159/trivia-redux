import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Card.css';

export default class Card extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="card-container">
        <div className="card-header">
          <h2>{title}</h2>
        </div>
        <div className="card-body">{children}</div>
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
