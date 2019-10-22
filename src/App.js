import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Settings from './components/Settings/Settings';
import LogVars from './components/LogVars/LogVars';
import Comment from './components/Comment/Comment';
import Output from './components/Output/Output';

const App = () => {
  return (
    <Container>
      <Settings />
      <LogVars />
      <Comment />
      <Output />
    </Container>
  );
};

export default App;
