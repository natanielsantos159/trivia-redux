import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import logo from '../images/trivia.png';
import SettingsButton from './SettingsButton';

class Header extends Component {
  constructor(props) {
    super(props);
    const { score } = this.props;

    this.state = {
      player: {
        name: '',
        assertions: 0,
        score,
        gravatarEmail: '',
      },
      ranking: {
        name: '',
        score: 10,
        picture: '',
      },
    };

    this.getGravatarPicture = this.getGravatarPicture.bind(this);
  }

  componentDidMount() {
    this.getGravatarPicture();
  }

  getGravatarPicture() {
    const { email, name, score } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      ranking: {
        name,
        score: 10,
        picture,
      },
      player: {
        name,
        assertions: 0,
        score,
        gravatarEmail: email,
      },
    });
  }

  render() {
    const { name } = this.props;
    const { ranking: { picture }, player: { score } } = this.state;
    return (
      <section className="top-container">
        <Link to="/">
          <img className="trivia-logo" src={ logo } alt="Trivia Logo" />
        </Link>
        <header>
          <div className="user-info">
            <img
              data-testid="header-profile-picture"
              className="header-profile-picture"
              src={ picture }
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
            <span data-testid="header-score">{ score }</span>
          </span>
          <SettingsButton />
        </header>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
});

export default connect(
  mapStateToProps,
)(Header);
