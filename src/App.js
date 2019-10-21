import React from 'react';
import Container from 'react-bootstrap/Container';

import BasicSettings from './components/BasicSettings/BasicSettings';
import LogVars from './components/LogVars/LogVars';
import Comment from './components/Comment/Comment';
import Output from './components/Output/Output';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <Container>
      <BasicSettings />
      <LogVars />
      <Comment />
      <Output />
    </Container>
  );
};

export default App;
