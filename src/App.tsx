import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Presets from './components/Presets/Presets';
import Settings from './components/Settings/Settings.container';
import LogVars from './components/LogVars/LogVars.container';
import Comment from './components/Comment/Comment.container';
import Output from './components/Output/Output.container';

const App = () => {
  return (
    <Container>
      <h1>JS Development helpers</h1>
      <Presets />
      <Settings />
      <LogVars />
      <Comment />
      <Output />
    </Container>
  );
};

export default App;
