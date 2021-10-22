import React, { Component } from 'react';

export default class QuestionCard extends Component {
  render() {
    const { results, counter } = this.props;
    return (
      <section className="question-card">
        <section className="category-section">
          <span data-testid="question-category">
            { results ? `Category: ${results[counter].category} ` : 'Category: ' }
          </span>
        </section>
        <br />
        <span data-testid="question-text">
          { results ? `Question: ${results[counter].question} ` : 'Question: ' }
        </span>
        <br />
      </section>
    );
  }
}
