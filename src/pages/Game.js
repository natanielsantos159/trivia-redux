import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTriviaQuestions } from '../actions';
import '../styles/Game.css';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import '../styles/QuestionCard.css';
import Answers from '../components/Answers';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      counter: 0,
      timer: 30,
    };

    this.handleCounter = this.handleCounter.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.handleQuestionTimer = this.handleQuestionTimer.bind(this);
  }

  componentDidMount() {
    const { triviaApi } = this.props;

    triviaApi()
      .then(() => this.getAnswers());
    this.handleQuestionTimer();
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  getAnswers() {
    const { triviaReturn: { results } } = this.props;
    console.log(results)
    const answers = results.reduce((acc, result) => {
      const incorrectAnswers = result.incorrect_answers.map((answer) => ({ answer,
        correct: false }));
      const currAnswers = [{ answer: result.correct_answer, correct: true },
        ...incorrectAnswers];
      const shuffledArray = this.shuffleArray(currAnswers);
      acc.push(shuffledArray);
      return acc;
    }, []);

    this.setState({ answers });
  }

  // Função de embaralhar array retirada do link: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/.
  shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;

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

  render() {
    const { counter, timer, answers } = this.state;
    const { triviaReturn: { results } } = this.props;
    return (
      <section>
        <Header />
        <section className="content-container">
          <QuestionCard results={ results ? results[counter] : [] } />
          <Answers
            answers={ answers[counter] }
            disabled={ timer === 0 }
            onClick={ this.handleAnswerClick }
          />
        </section>
        <section className="bottom-container">
          <span className="timer">{ `Tempo restante: ${timer} segundos` }</span>
          <button
            type="button"
            className="next-question-btn"
            onClick={ this.handleCounter }
          >
            Próxima
          </button>
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
