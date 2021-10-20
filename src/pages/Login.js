import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, name } = this.state;

    return (
      <section className="App">
        <form>
          <label htmlFor="emailInput">
            E-mail:
            <input
              id="emailInput"
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="nameInput">
            Name:
            <input
              id="nameInput"
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ name }
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(name && email) }
            >
              Jogar
            </button>
          </label>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

export default Login;
