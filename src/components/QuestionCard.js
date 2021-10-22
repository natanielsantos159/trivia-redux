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
        <div data-testid="question-text" className="question-text">
          { results ? `Question: ${results[counter].question} ` : 'Question: ' }
        </div>
        <br />
      </section>
    );
  }
}
