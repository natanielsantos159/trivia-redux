import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTriviaQuestions } from '../actions';
import '../styles/Game.css';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import '../styles/QuestionCard.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
    };

    this.handleCounter = this.handleCounter.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  async componentDidMount() {
    const { triviaApi } = this.props;

    triviaApi();
  }

  handleAnswerClick() {
    const alreadClicked = document.querySelector('.clicked') !== null;

    if (!alreadClicked) {
      const answers = document.querySelectorAll('.answer');
      [...answers].forEach((answer) => answer.classList.add('clicked'));
    }
  }

  handleCounter() {
    this.setState((prevState) => ({
      counter: prevState + 1,
    }));
  }

  // Função de embaralhar array retirada do link: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/.
  shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  render() {
    const { counter } = this.state;
    const { triviaReturn: { results } } = this.props;
    const answers = [];
    if (results) {
      answers.push(
        <button
          type="button"
          data-testid="correct-answer"
          className="answer correct"
          key="4"
          onClick={ this.handleAnswerClick }
        >
          { results[counter].correct_answer }
        </button>,
        results[counter].incorrect_answers
          .map((incorrect, index) => (
            <button
              type="button"
              className="answer incorrect"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleAnswerClick }
            >
              { incorrect }
            </button>)),
      ); this.shuffleArray(answers);
    }

    return (
      <section>
        <Header />
        <section className="content-container">
          <QuestionCard results={ results } counter={ counter } />
          <section className="answers-container">
            { answers.map((eachAnswer) => eachAnswer)}
          </section>
        </section>
      </section>
    );
  }
}

Game.propTypes = {
  triviaApi: PropTypes.func.isRequired,
  triviaReturn: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  triviaApi: () => dispatch(fetchTriviaQuestions()),
});

const mapStateToProps = (state) => ({
  triviaReturn: state.gameReducer.triviaReturn,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
