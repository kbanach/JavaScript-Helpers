import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Footer.css';

export const Footer: React.FC = () => (
  <Row>
    {process.env.REACT_APP_BUILD_TIME && (
      <Col className="footer">Built: {process.env.REACT_APP_BUILD_TIME}</Col>
    )}
  </Row>
);
