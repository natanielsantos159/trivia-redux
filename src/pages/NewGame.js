import React, { Component } from 'react';
import logo from '../images/trivia.png';

export default class NewGame extends Component {
  render() {
    return (
      <main>
        <section className="top-container">
          <img className="trivia-logo" src={ logo } alt="Trivia Logo" />
        </section>

        <section className="content-container">
          <section className="new-game-section">
            <h1>Novo jogo</h1>
          </section>
        </section>
      </main>
    );
  }
}
