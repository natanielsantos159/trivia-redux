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
      timer: 30,
      score: 0,
    };

    this.handleCounter = this.handleCounter.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.handleQuestionTimer = this.handleQuestionTimer.bind(this);
    this.handleOrganizeAnswers = this.handleOrganizeAnswers.bind(this);
    this.handleCorrectChange = this.handleCorrectChange.bind(this);
  }

  componentDidMount() {
    const { triviaApi } = this.props;

    triviaApi();
    this.handleQuestionTimer();
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  handleQuestionTimer() {
    const interval = 1000;
    const thirty = 30;
    let timer = thirty;
    setInterval(() => {
      if (timer > 0) {
        timer -= 1;
        this.setState({
          timer,
        });
      }
    }, interval);
    return timer;
  }

  handleCorrectChange() {
    const { timer, counter } = this.state;
    const { triviaReturn: { results } } = this.props;

    if (results) {
      let difficulty = 0;
      if (results[counter].difficulty === 'easy') {
        difficulty = 1;
      }
      if (results[counter].difficulty === 'medium') {
        difficulty = 2;
      }
      if (results[counter].difficulty === 'hard') {
        const three = 3;
        difficulty = three;
      }
      const ten = 10;
      this.setState((prevState) => ({
        score: prevState + (ten + (timer * difficulty)),
      }));
      console.log(difficulty);
    }
    console.log(this.state.score);
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
  shuffleArray(array) {
    let currentIndex = array.length; let
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  handleOrganizeAnswers() {
    const { counter, timer } = this.state;
    const { triviaReturn: { results } } = this.props;
    const answers = [];
    if (results) {
      answers.push(
        <button
          type="button"
          data-testid="correct-answer"
          className="answer correct"
          key="4"
          onClick={ this.handleCorrectChange }
          disabled={ timer === 0 }
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
              disabled={ timer === 0 }
            >
              { incorrect }
            </button>)),
      );
    }
    return answers;
  }

  render() {
    const { counter, timer, score } = this.state;
    const { triviaReturn: { results } } = this.props;

    return (
      <section>
        <Header score={ score } />
        <section className="content-container">
          <QuestionCard results={ results } counter={ counter } />
          <section className="answers-container">
            { this.handleOrganizeAnswers().map((eachAnswer) => eachAnswer) }
          </section>
        </section>
        <span>
          { timer <= 1 ? `Tempo restante: ${timer} segundo`
            : `Tempo restante: ${timer} segundos` }
        </span>
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
