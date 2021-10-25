import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Answers extends Component {
  render() {
    const { onClick, answers, disabled } = this.props;
    return (
      <section className="answers-container">
        { answers.map((answer, index) => (
          <button
            type="button"
            data-testid={ `${answer.correct ? 'correct' : 'incorrect'}-answer` }
            className={ `answer ${answer.correct ? 'correct' : 'incorrect'}` }
            key={ index }
            onClick={ onClick }
            disabled={ disabled }
          >
            { answer.answer }
          </button>
        ))}
      </section>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool.isRequired,
};

Answers.defaultProps = {
  answers: [],
};
