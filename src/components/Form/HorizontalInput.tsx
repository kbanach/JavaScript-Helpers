/**
 * This file is a bit retarded. It can not be converted to *.tsx file,
 * because of complains of Form.Control (from react-bootstrap) that does not
 * know how to handle spreaded properties.
 *
 * TODO: This helper component should be rewritten from scratch.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export enum INPUT_TYPE {
  INPUT = 'input',
  TEXTAREA = 'textarea',
}

interface HorizontalInputProps {
  label: string;
  value: string;
  type?: INPUT_TYPE;
  errorMsg?: string;
  rows?: number;
  onChange: (val: string) => void;
}

const HorizontalInput: React.FC<HorizontalInputProps> = ({
  label,
  value,
  type = INPUT_TYPE.INPUT,
  onChange,
  errorMsg,
  rows,
}) => {
  return (
    <Form.Group as={Row} className="align-items-center">
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col sm="9">
        {type === INPUT_TYPE.INPUT && (
          <Form.Control
            onChange={(e: any) => {
              e.preventDefault();
              onChange(e?.target?.value ?? ('' as string));
            }}
            isInvalid={!!errorMsg}
            value={value}
          />
        )}
        {type === INPUT_TYPE.TEXTAREA && (
          <Form.Control
            as="textarea"
            onChange={(e: any) => {
              e.preventDefault();
              onChange(e?.target?.value ?? ('' as string));
            }}
            isInvalid={!!errorMsg}
            value={value}
            rows={rows}
          />
        )}
        {errorMsg && (
          <Form.Control.Feedback type="invalid">
            {errorMsg}
          </Form.Control.Feedback>
        )}
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
