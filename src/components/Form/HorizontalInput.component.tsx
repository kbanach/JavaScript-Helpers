import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { INPUT_TYPE, HorizontalInputProps } from './HorizontalInput.interface';

export const HorizontalInput: React.FC<HorizontalInputProps> = (props) => {
  const {
    label,
    value,
    type = INPUT_TYPE.INPUT,
    onChange,
    errorMsg,
    rows,
  } = props;

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
