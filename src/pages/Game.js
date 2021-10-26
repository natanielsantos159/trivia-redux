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
  constructor(props) {
    super(props);
    const { email, name } = props;

    this.state = {
      answers: [],
      counter: 0,
      timer: 30,
      state: {
        player: {
          name,
          assertions: 0,
          score: 0,
          gravatarEmail: email,
        },
      },
      /*       ranking: {
        name: '',
        score: 10,
        picture: '',
      }, */
    };
    this.gameTimer = null;
    this.handleCounter = this.handleCounter.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.handleQuestionTimer = this.handleQuestionTimer.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleCorrectChange = this.handleCorrectChange.bind(this);
  }

  componentDidMount() {
    const { triviaApi } = this.props;
    const { state } = this.state;

    triviaApi()
      .then(() => this.getAnswers());
    this.handleQuestionTimer();

    localStorage.setItem('state', JSON.stringify(state));
  }

  componentDidUpdate() {
    const { state } = this.state;

    localStorage.setItem('state', JSON.stringify(state));
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

  async handleCorrectChange() {
    const { timer, counter } = this.state;
    const { triviaReturn: { results }, email, name } = this.props;

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
      state: {
        player: {
          name,
          assertions: prevState.state.player.assertions + 1,
          score: prevState.state.player.score + (ten + (timer * difficulty)),
          gravatarEmail: email,
        },
      },
    }));
  }

  handleAnswerClick({ target }) {
    const alreadClicked = document.querySelector('.clicked') !== null;
    const answers = document.querySelectorAll('.answer');
    const nextBtn = document.querySelector('.next-question-btn');
    nextBtn.classList.add('visible');

    if (!alreadClicked) {
      [...answers].forEach((answer) => answer.classList.add('clicked'));
    }

    if (target.classList.contains('correct')) this.handleCorrectChange();
  }

  handleCounter() {
    const { counter } = this.state;
    const { history } = this.props;
    const questionCard = document.querySelector('.question-card');
    const answersContainer = document.querySelector('.answers-container');
    const answers = document.querySelectorAll('.answer');
    const four = 4;

    if (counter === four) {
      history.push('/feedback');
    }

    document.querySelector('.next-question-btn').classList.remove('visible');
    questionCard.style.display = 'none';
    answersContainer.style.display = 'none';

    this.setState((prevState) => ({ counter: prevState.counter + 1 }));

    clearInterval(this.gameTimer);
    this.handleQuestionTimer();

    setTimeout(() => {
      questionCard.style.display = 'block';
      answersContainer.style.display = 'flex';
      [...answers].forEach((answer) => answer.classList.remove('clicked'));
    }, 100);
  }

  render() {
    const { counter, timer, answers, state } = this.state;
    const { triviaReturn: { results } } = this.props;
    return (
      <section>
        <Header score={ state.player.score } />
        <section className="content-container">
          <QuestionCard results={ results ? results[counter] : {} } />
          <Answers
            answers={ answers[counter] }
            disabled={ timer === 0 }
            onClick={ this.handleAnswerClick }
          />
        </section>
        <section className="bottom-container">
          <span>
            { timer <= 1 ? `Tempo restante: ${timer} segundo`
              : `Tempo restante: ${timer} segundos` }
          </span>
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
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  triviaApi: () => dispatch(fetchTriviaQuestions()),
});

const mapStateToProps = (state) => ({
  triviaReturn: state.gameReducer.triviaReturn,
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
