import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import logo from '../images/trivia.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      profilePicture: '',
    };

    this.getGravatarPicture = this.getGravatarPicture.bind(this);
  }

  componentDidMount() {
    this.getGravatarPicture();
  }

  getGravatarPicture() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const profilePicture = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ profilePicture });
  }

  render() {
    const { name } = this.props;
    const { profilePicture } = this.state;
    return (
      <section className="top-container">
        <img className="trivia-logo" src={ logo } alt="Trivia Logo" />
        <header>
          <div className="user-info">
            <img
              data-testid="header-profile-picture"
              className="header-profile-picture"
              src={ profilePicture }
              alt="profile"
            />
            <span className="player-name">
              Jogador:
              {' '}
              <span data-testid="header-player-name">{ name }</span>
            </span>
          </div>
          <span className="player-score">
            Pontos:
            {' '}
            <span data-testid="header-score">0</span>
          </span>
        </header>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
});

export default connect(
  mapStateToProps,
)(Header);
