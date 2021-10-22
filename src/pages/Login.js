import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken, setUserLogin } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.toPlay = this.toPlay.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async toPlay() {
    const { tokenAPI, history, setUser } = this.props;
    const { email, name } = this.state;
    await tokenAPI();
    setUser({ email, name });
    history.push('/game');
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
              onClick={ this.toPlay }
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

const mapDispatchToProps = (dispatch) => ({
  tokenAPI: () => dispatch(fetchToken()),
  setUser: (state) => dispatch(setUserLogin(state)),
});

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

Login.propTypes = {
  tokenAPI: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
