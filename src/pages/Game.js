import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTriviaQuestions } from '../actions';
import '../styles/Game.css';

class Game extends Component {
  componentDidMount() {
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

  render() {
    const { triviaReturn } = this.props;
    const { results } = triviaReturn;
    const questions = [];
    if (results) {
      questions.push(
        <button
          type="button"
          data-testid="correct-answer"
          className="answer correct"
          key="4"
          onClick={ this.handleAnswerClick }
        >
          { results[0].correct_answer }
        </button>,
        results[0].incorrect_answers
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
      );
    }

    return (
      <section>
        <span data-testid="question-category">
          { results ? `Category: ${results[0].category} ` : 'Category: ' }
        </span>
        <br />
        <span data-testid="question-text">
          { results ? `Question: ${results[0].question} ` : 'Question: ' }
        </span>
        <br />
        <section>
          { results ? questions.map((eachQuestion) => eachQuestion).sort() : '' }
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
