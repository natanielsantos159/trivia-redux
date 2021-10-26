import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/Feedback.css';

export default class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      state: {
        player: {
          assertions: 0,
          score: 0,
        },
      },
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
    const { state } = this.state;
    const three = 3;
    return (
      <>
        <Header score={ state.player.score } />
        <main className="feedback-container">
          <section className="result-header">
            <p>Resultado</p>
          </section>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">
              { ` ${state.player.assertions} ` }
            </span>
            perguntas
          </p>
          <p>
            <span data-testid="feedback-total-score">
              { `${state.player.score} ` }
            </span>
            Pontos
          </p>
          <p
            className="feedback-text"
            data-testid="feedback-text"
          >
            { state.player.assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...'}
          </p>
        </main>
      </>
    );
  }
}
