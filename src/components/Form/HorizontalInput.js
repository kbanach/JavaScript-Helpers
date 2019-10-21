import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const INPUT_TYPE = {
  INPUT: 'input',
  TEXTAREA: 'textarea'
}

const HorizontalInput = ({label, type = INPUT_TYPE.INPUT, ...props}) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="3">{label}</Form.Label>
      <Col sm="9">
        <Form.Control as={type} {...props} />
      </Col>
    </Form.Group>
  );
};

export default HorizontalInput;
