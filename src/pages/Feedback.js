import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Feedback.css';
import starIcon from '../images/star-solid.svg';

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
        <div className="feedback-container">
          <div className="result-header">
            <p>Resultado</p>
          </div>
          <div>
            <div className="stars">
              { new Array(state.player.assertions)
                .fill(<img src={ starIcon } alt="starIcon" className="star" />) }
            </div>
            <p>
              Você acertou
              <span className="feedback-total-question">
                { ` ${state.player.assertions} ` }
              </span>
              perguntas
            </p>
            <p>
              Sua pontuação:
              <span className="feedback-total-score">
                { `${state.player.score} ` }
              </span>
            </p>
            <p
              className="feedback-text"
            >
              { state.player.assertions >= three ? 'Mandou bem!' : 'Podia ser melhor...'}
            </p>
          </div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              className="btn-play"
            >
              Play again!
            </button>
          </Link>
        </div>
      </>
    );
  }
}
