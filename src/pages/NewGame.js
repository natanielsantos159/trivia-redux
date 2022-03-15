import React, { Component } from 'react';
import Card from '../components/Card';
import logo from '../images/trivia.png';
import { categories } from '../data';
import { fetchToken } from '../actions';

import '../styles/NewGame.css';

class NewGame extends Component {
  constructor() {
    super();
    this.state = {
      amount: 5,
      difficulty: 'easy',
      category: 'any',
      type: 'multiple',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  toPlay() {
    const { tokenAPI, history } = this.props;
    tokenAPI();
    history.push('/game');
  }

  render() {
    const { amount, difficulty, category, type } = this.state;
    return (
      <main>
        <section className="top-container">
          <img className="trivia-logo" src={ logo } alt="Trivia Logo" />
        </section>
        <section className="content-container new-game-page">
          <Card title="Novo jogo">
            <label htmlFor="amount">
              Numero de questões:
              <select id="question-amount" name="amount" value={ amount } onChange={ this.handleChange }>
                <option value={ 5 }>5</option>
                <option value={ 10 }>10</option>
                <option value={ 15 }>15</option>
              </select>
            </label>
            <label htmlFor="difficulty">
              Dificuldade:
              <select id="difficulty" name="difficulty" onChange={ this.handleChange } value={ difficulty }>
                <option value="easy">Fácil</option>
                <option value="medium">Intermediário</option>
                <option value="hard">Difícil</option>
              </select>
            </label>
            <label htmlFor="category">
              Categoria:
              <select name="category" id="category" onChange={ this.handleChange } value={ category }>
                <option value="any">Qualquer Categoria</option>
                { categories.map(({ id, name }) => <option value={ id } key={ id }>{name}</option>)}
              </select>
            </label>
            <label htmlFor="type" name="type">
              <span>Tipo:</span>
              <label htmlFor="multiple-choice" onChange={ this.handleChange }>
                Múltipla Escolha
                <input
                  id="multiple-choice"
                  type="radio"
                  value="multiple"
                  name="type"
                  checked={ type === 'multiple' }
                />
              </label>
              <label htmlFor="true-false" onChange={ this.handleChange }>
                Verdadeiro ou Falso
                <input
                  id="true-false"
                  type="radio"
                  value="boolean"
                  name="type"
                  checked={ type === 'boolean' }
                />
              </label>
            </label>
            <button className="btn-play" onClick={this.toPlay}>Jogar!</button>
          </Card>
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenAPI: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

Login.propTypes = {
  tokenAPI: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
