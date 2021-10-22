import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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
      <header>
        <img
          data-testid="header-profile-picture"
          src={ profilePicture }
          alt="profile"
        />
        <div data-testid="header-player-name">{ name }</div>
        <span data-testid="header-score">0</span>
      </header>
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
