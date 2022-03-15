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
      picture: '',
      email: '',
      name: '',
    };

    this.getGravatarPicture = this.getGravatarPicture.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    const { email, name } = JSON.parse(localStorage.getItem('trivia-user')) || {};
    if (email && name) {
      this.setState({ email, name }, this.getGravatarPicture);
    } else {
      const { email: emailProps, name: nameProps } = this.props;
      this.setState({ email: emailProps, name: nameProps }, this.getGravatarPicture);
    }
  }

  getGravatarPicture() {
    const { email } = this.state;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ picture });
  }

  render() {
    const { name, picture } = this.state;
    const { score } = this.props;

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
