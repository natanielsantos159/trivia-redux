import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionCard extends Component {
  encodeUtf8(string) {
    // função do Lucas Rodrigues Turma 08
    const stringUTF = unescape(encodeURIComponent(string));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
  }

  render() {
    const { results } = this.props;
    return (
      <section className="question-card">
        <section className="category-section">
          <span data-testid="question-category">
            { results ? `Category: ${results.category} ` : 'Category: ' }
          </span>
        </section>
        <br />
        <div data-testid="question-text" className="question-text">
          { results ? `Question: ${this.encodeUtf8(results.question)} ` : 'Question: ' }
        </div>
        <br />
      </section>
    );
  }
}

QuestionCard.propTypes = {
  results: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    question: PropTypes.string,
  }),
};

QuestionCard.defaultProps = {
  results: undefined,
};
