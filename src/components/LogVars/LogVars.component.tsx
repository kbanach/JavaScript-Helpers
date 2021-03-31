import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LogVarsComponentProps } from './LogVars.interface';
import { VarsState } from './LogVars.reducers';
import { HorizontalInput } from '../Form';

export const LogVarsComponent: React.FC<LogVarsComponentProps> = (props) => {
  const { resetVariables, onChange, rawVars, bracketsError } = props;

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h3>Variables</h3>
          </Col>
          <Col className="text-right">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                resetVariables();
              }}
            >
              Reset variables
            </Button>
          </Col>
        </Row>

        <HorizontalInput
          label="Variable names to log"
          onChange={(rawVars: VarsState['rawVars']) => {
            onChange(rawVars);
          }}
          value={rawVars}
          errorMsg={bracketsError}
        />
      </Col>
    </Row>
  );
};
