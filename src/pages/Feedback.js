import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <table className="feedback-container">
          <thead className="result-header">
            <th>Resultado</th>
          </thead>
          <tbody>
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
          </tbody>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              className="btn-play"
            >
              Play again!
            </button>
          </Link>
        </table>
      </>
    );
  }
}
