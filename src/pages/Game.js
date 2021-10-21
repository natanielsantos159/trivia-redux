import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTriviaQuestions } from '../actions';
import Header from '../components/Header';

class Game extends Component {
  componentDidMount() {
    const { triviaApi } = this.props;

    triviaApi();
  }

  render() {
    const { triviaReturn } = this.props;
    const { results } = triviaReturn;
    const questions = [];
    if (results) {
      questions.push(
        <button type="button" data-testid="correct-answer" key="4">
          { results[0].correct_answer }
        </button>,
        results[0].incorrect_answers
          .map((incorrect, index) => (
            <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
              { incorrect }
            </button>)),
      );
    }

    return (
      <section>
        <section>
          <Header />
        </section>
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
