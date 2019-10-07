import React from 'react';
import './Header.css';
import logo from './logo.svg';
import { ThemeContext } from './theme';

export const Header = props => (
  <ThemeContext.Consumer>
    {theme => (
      <header
        className="header"
        style={{backgroundColor: theme.background, color: theme.foreground}}
      >
        <img src={logo} className="logo" alt="logo" />
        <p>
          Main color: {theme.foreground}, background color: {theme.background}
        </p>
      </header>
    )}
  </ThemeContext.Consumer>
);

