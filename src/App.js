import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { setConsoleLogVars } from './actions';
import PropTypes from 'prop-types';

const App = ({ dispatch, vars }) => {
  let input;

  return (
  <div className="App">
    <form onSubmit={
      (e) => {
        e.preventDefault();

        if (!input.value.trim()) {
          return;
        }

        dispatch(setConsoleLogVars(input.value));
      }
    }>
      <input ref={node => (input = node)} />
      <button type="submit">Set Vars</button>
    </form>

    { vars && vars.map((v, key) => (
      <div key={key}>{v}</div>
    )) }

  </div>
  );
};

App.propTypes = {
  vars: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
  vars: state.consoleLogsGenerator.vars
});

export default connect(mapStateToProps)(App);
