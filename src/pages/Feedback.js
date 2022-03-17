import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Feedback.css';
import starIcon from '../images/star-solid.svg';
import starIconBlack from '../images/star-solid-black.svg';
import Card from '../components/Card';
import { connect } from 'react-redux';

class Feedback extends Component {
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
    this.getStars = this.getStars.bind(this);
  }

  componentDidMount() {
    this.getState();
  }

  getState() {
    const state = JSON.parse(localStorage.getItem('state'));
    this.setState({ state });
  }

  getStars() {
    const { state: { player: { assertions } } } = this.state;
    const { amount } = this.props;
    const starsAmount = Math.floor(assertions / (amount / 5));
    console.log({ amount, starsAmount });
    const starsArray = new Array(5)
      .fill(<img src={ starIcon } alt="Star Icon" className="star" />, 0, starsAmount)
      .fill(<img src={ starIconBlack } alt="Star Icon Black" className="star" />, starsAmount);
    return starsArray;
  }

  render() {
    const { state } = this.state;
    const three = 3;
    return (
      <>
        <Header score={ state.player.score } />
        <Card title="Resultado">
          <span className="feedback-total-score">
            { state.player.score }
          </span>
          <div className="stars">{this.getStars()}</div>
          { state.player.assertions > 0 ? (
            <p>
              Você acertou
              <span className="feedback-total-question">
                { ` ${state.player.assertions} ` }
              </span>
              { state.player.assertions > 1 ? 'perguntas' : 'pergunta' }
            </p>
          ) : 'Você não acertou nenhuma questão :('}
          <p
            className="feedback-text"
          >
            { state.player.assertions >= three ? 'Mandou bem! 🎉' : 'Podia ser melhor...'}
          </p>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play-again"
              className="btn-play"
            >
              Play again!
            </button>
          </Link>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  amount: state.gameReducer.gameOptions.amount,
});

export default connect(mapStateToProps)(Feedback);
