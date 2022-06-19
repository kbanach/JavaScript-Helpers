import React, { useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Logs, TheTableOfContents } from './pages';
import { Footer } from './components/Footer';

enum Pages {
  LOGS = 'Logs Generator',
  TABLE_OF_CONTENTS = 'Table of Contents Generator',
}

const App = () => {
  const [key, setKey] = useState<string>(Pages.LOGS);

  return (
    <Container>
      <Row>
        <Col className="d-flex flex-column">
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => {
              k && setKey(k);
            }}
          >
            <Tab
              eventKey={Pages.LOGS}
              title={Pages.LOGS}
              className="app__page app__tab-logs-generator"
            >
              <Logs />
            </Tab>
            <Tab
              eventKey={Pages.TABLE_OF_CONTENTS}
              title={Pages.TABLE_OF_CONTENTS}
              className="app__page"
            >
              <TheTableOfContents />
            </Tab>
          </Tabs>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
