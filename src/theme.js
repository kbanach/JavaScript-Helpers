import React from 'react';

export const themes = {
  light: {
    foreground: '#222',
    background: '#eee',
  },
  dark: {
    foreground: '#fff',
    background: '#222',
  },
};

export const ThemeContext = React.createContext(themes.dark);
