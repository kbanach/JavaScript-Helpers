import React from 'react';
import './App.css';
import { ThemeContext, themes } from './theme';
import { Header } from './Header';

class App extends React.Component {
  state = {
    theme: themes.dark,
  };

  changeTheme() {
    return (e) => {
      e.preventDefault();

      this.setState({
        ...this.state,
        theme: (this.state.theme === themes.dark) ? themes.light : themes.dark,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <ThemeContext.Provider value={this.state.theme}>
          <Header />
          <button onClick={this.changeTheme()}>Change theme</button>
        </ThemeContext.Provider>
      </div>
    );
  }


}

export default App;
