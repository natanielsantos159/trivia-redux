import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Answers.css';

export default class Answers extends Component {
  encodeUtf8(string) {
    // função do Lucas Rodrigues Turma 08
    const stringUTF = unescape(encodeURIComponent(string));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
  }

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
            { this.encodeUtf8(answer) }
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
