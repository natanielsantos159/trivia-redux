import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTriviaQuestions } from '../actions';
import Header from '../components/Header';

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
    const questions = [];
    if (results) {
      questions.push(
        <button type="button" key="4" data-testid="correct-answer">
          { results[counter].correct_answer }
        </button>,
        results[counter].incorrect_answers
          .map((incorrect, index) => (
            <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
              { incorrect }
            </button>)),
      ); this.shuffleArray(questions);
    }

    return (
      <section>
        <section>
          <Header />
        </section>
        <section>
          <span data-testid="question-category">
            { results ? `Category: ${results[counter].category} ` : 'Category: ' }
          </span>
          <br />
          <span data-testid="question-text">
            { results ? `Question: ${results[counter].question} ` : 'Question: ' }
          </span>
          <br />
          <section>
            { questions.map((eachQuestion) => eachQuestion)}
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
