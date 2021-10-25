import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, setUserLogin } from '../actions';
import '../styles/Login.css';
import logo from '../images/trivia.png';
import SettingsButton from '../components/SettingsButton';

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
      <>
        <img className="login-trivia-logo" src={ logo } alt="Trivia Logo" />
        <section className="login-section">
          <SettingsButton />
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
            </label>
            <button
              type="button"
              data-testid="btn-play"
              className="btn-play"
              disabled={ !(name && email) }
              onClick={ this.toPlay }
            >
              Jogar
            </button>
          </form>
        </section>
      </>
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
