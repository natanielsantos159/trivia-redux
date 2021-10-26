import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <section>
        <Header />
        <span data-testid="feedback-text">Feedback</span>
      </section>
    );
  }
}
