import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { PresetsComponentProps } from './Presets.interface';
import { PresetNames, getPreset } from '../Settings';

export const PresetsComponent: React.FC<PresetsComponentProps> = (props) => (
  <Row>
    <Col className="d-flex flex-column">
      <h3>Presets</h3>
      <ButtonGroup size="sm" className="mt-3">
        {Object.values(PresetNames).map((key) => (
          <Button
            key={key}
            variant={props.activePreset === key ? 'primary' : 'outline-primary'}
            onClick={() => props.changePreset(key)}
          >
            {getPreset(key).presetFullName}
          </Button>
        ))}
      </ButtonGroup>
      <br />
    </Col>
  </Row>
);
