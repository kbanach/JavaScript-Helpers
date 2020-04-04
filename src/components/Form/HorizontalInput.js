import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const INPUT_TYPE = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
};

const HorizontalInput = ({
  label,
  type = INPUT_TYPE.INPUT,
  onChange,
  ...props
}) => {
  return (
    <Form.Group as={Row} className="align-items-center">
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col sm="9">
        <Form.Control
          as={type}
          onChange={e => {
            e.preventDefault();
            onChange(e.target.value);
          }}
          {...props}
        />
      </Col>
    </Form.Group>
  );
};

HorizontalInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(INPUT_TYPE)),
};

export default HorizontalInput;
