import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import settings from '../images/sliders-h-solid (1).svg';

export default class SettingsButton extends Component {
  render() {
    return (
      <Link to="/settings">
        <button
          type="button"
          data-testid="btn-settings"
          className="btn-settings"
        >
          {/* License: https://fontawesome.com/license/free */}
          <img className="settings-icon" src={ settings } alt="Configurações" />
        </button>
      </Link>
    );
  }
}
