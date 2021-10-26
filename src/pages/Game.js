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
    this.gameTimer = null;
    this.handleCounter = this.handleCounter.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.handleQuestionTimer = this.handleQuestionTimer.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
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
    const thirty = 31;
    let timer = thirty;
    this.gameTimer = setInterval(() => {
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
    const answers = document.querySelectorAll('.answer');
    const nextBtn = document.querySelector('.next-question-btn');
    nextBtn.classList.add('visible');
    if (!alreadClicked) {
      [...answers].forEach((answer) => answer.classList.add('clicked'));
    }
  }

  handleCounter() {
    const questionCard = document.querySelector('.question-card');
    const answersContainer = document.querySelector('.answers-container');
    const nextBtn = document.querySelector('.next-question-btn');
    const answers = document.querySelectorAll('.answer');

    nextBtn.classList.remove('visible');
    questionCard.style.display = 'none';
    answersContainer.style.display = 'none';

    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));

    clearInterval(this.gameTimer);
    this.handleQuestionTimer();

    setTimeout(() => {
      questionCard.style.display = 'block';
      answersContainer.style.display = 'flex';
      [...answers].forEach((answer) => answer.classList.remove('clicked'));
    }, 100);
  }

  render() {
    const { counter, timer, answers } = this.state;
    const { triviaReturn: { results } } = this.props;
    return (
      <section>
        <Header />
        <section className="content-container">
          <QuestionCard results={ results ? results[counter] : {} } />
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
            data-testid="btn-next"
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
