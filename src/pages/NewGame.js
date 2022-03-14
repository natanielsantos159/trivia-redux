import React, { Component } from 'react';
import Card from '../components/Card';
import logo from '../images/trivia.png';
import { categories } from '../data';

export default class NewGame extends Component {
  render() {
    return (
      <main>
        <section className="top-container">
          <img className="trivia-logo" src={ logo } alt="Trivia Logo" />
        </section>

        <section className="content-container">
          <Card title="Novo jogo">
            <label htmlFor="question-amount">
              Numero de questões:
              <select id="question-amount" name="question-amount">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
            <label htmlFor="difficulty">
              Dificuldade:
              <select id="difficulty" name="difficulty">
                <option value="easy">Fácil</option>
                <option value="medium">Intermediário</option>
                <option value="hard">Difícil</option>
              </select>
            </label>
            <label htmlFor="category-select">
              Categoria:
              <select name="category-select" id="category-select">
                <option value="any">Qualquer Categoria</option>
                { categories.map(({ id, name }) => <option value={ id } key={ id }>{name}</option>)}
              </select>
            </label>
            <span>Tipo:</span>
            <label htmlFor="multiple-choice">
              Múltipla Escolha
              <input id="multiple-choice" type="radio" value="multiple" name="question-type" checked />
            </label>
            <label htmlFor="true-false">
              Verdadeiro ou Falso
              <input id="true-false" type="radio" value="boolean" name="question-type" />
            </label>

          </Card>
        </section>
      </main>
    );
  }
}
