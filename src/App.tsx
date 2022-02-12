import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Settings } from './components/Settings';
import { LogVars } from './components/LogVars';
import { Comment } from './components/Comment';
import { Output } from './components/Output';
import { Presets } from './components/Presets';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <Container>
      <h1>JS Development helpers</h1>
      <Presets />
      <Settings />
      <LogVars />
      <Comment />
      <Output />
      <Footer />
    </Container>
  );
};

export default App;
