import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Answers extends Component {
  render() {
    const { onClick, answers, disabled, clicked } = this.props;
    return (
      <section className="answers-container">
        { answers.map(({ answer, correct }, index) => (
          <button
            type="button"
            data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
            className={ `answer ${correct ? 'correct' : 'incorrect'} ${clicked && 'clicked'}` }
            key={ index }
            onClick={ onClick }
            disabled={ disabled }
          >
            { answer }
          </button>
        ))}
      </section>
    );
  }
}

Answers.propTypes = {
  onClick: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool.isRequired,
  clicked: PropTypes.bool.isRequired,
};

Answers.defaultProps = {
  answers: [],
};
