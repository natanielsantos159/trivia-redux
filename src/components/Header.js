import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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
      <header>
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="profile"
        />
        <div data-testid="header-player-name">{ name }</div>
        <span data-testid="header-score">{ score }</span>
      </header>
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
