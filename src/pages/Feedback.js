import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      state: {},
    };

    this.getState = this.getState.bind(this);
  }

  componentDidMount() {
    this.getState();
  }

  getState() {
    const state = JSON.parse(localStorage.getItem('state'));

    this.setState({ state });
  }

  render() {
    const { state: { player } } = this.state;
    const three = 3;
    return (
      <>
        <Header score={ player.score } />
        <main className="feedback-container">
          <p
            className="feedback-text"
            data-testid="feedback-text"
          >
            { player.assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...'}
          </p>
        </main>
      </>
    );
  }
}
