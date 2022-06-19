import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SettingsValues, SettingsComponentProps } from './Settings.interface';
import { HorizontalInput } from '../Form';

export const SettingsComponent: React.FC<SettingsComponentProps> = (props) => {
  const changeLineLength = (lineLenStr: string) => {
    let lineLength = parseInt(lineLenStr);

    if (isNaN(lineLength)) {
      lineLength = 0;
    }

    props.onChange({
      lineLength,
    });
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h3>Settings</h3>
          </Col>
          <Col className="text-right">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={props.resetForm}
            >
              Reset settings
            </Button>
          </Col>
        </Row>

        <HorizontalInput
          label="Char to use as filler"
          onChange={(filler: SettingsValues['filler']) => {
            props.onChange({ filler });
          }}
          value={props.filler}
        />

        <HorizontalInput
          label="Line length"
          onChange={changeLineLength}
          value={'' + props.lineLength}
        />

        <Row>
          <Col>
            <h3>Advanced settings</h3>
          </Col>
          <Col className="text-right">
            {props.showAdvancedSettings ? (
              <Button variant="primary" size="sm" onClick={props.hideAdvanced}>
                Hide advanced settings
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={props.showAdvanced}
              >
                Show advanced settings
              </Button>
            )}
          </Col>
        </Row>

        {props.showAdvancedSettings && (
          <div>
            <HorizontalInput
              label="General prefix"
              onChange={(generalPrefix: SettingsValues['generalPrefix']) => {
                props.onChange({ generalPrefix });
              }}
              value={props.generalPrefix}
            />
            <HorizontalInput
              label="General postfix"
              onChange={(generalPostfix: SettingsValues['generalPostfix']) => {
                props.onChange({ generalPostfix });
              }}
              value={props.generalPostfix}
            />
            <HorizontalInput
              label="Line start"
              onChange={(lineStart: SettingsValues['lineStart']) => {
                props.onChange({ lineStart });
              }}
              value={props.lineStart}
            />
            <HorizontalInput
              label="Line end"
              onChange={(lineEnd: SettingsValues['lineEnd']) => {
                props.onChange({ lineEnd });
              }}
              value={props.lineEnd}
            />
            <HorizontalInput
              label="Char escaper"
              onChange={(charEscaper: SettingsValues['charEscaper']) => {
                props.onChange({ charEscaper });
              }}
              value={props.charEscaper}
            />
            <HorizontalInput
              label="Concatenate variable in log char"
              onChange={(
                variableConcatenateChar: SettingsValues['variableConcatenateChar'],
              ) => {
                props.onChange({ variableConcatenateChar });
              }}
              value={props.variableConcatenateChar}
            />
            <HorizontalInput
              label="Variable wrapper prefix"
              onChange={(
                prefix: SettingsValues['variableWrapperCodePrefix'],
              ) => {
                props.onChange({ variableWrapperCodePrefix: prefix });
              }}
              value={props.variableWrapperCodePrefix}
            />
            <HorizontalInput
              label="Variable wrapper postfix"
              onChange={(
                postfix: SettingsValues['variableWrapperCodePostfix'],
              ) => {
                props.onChange({ variableWrapperCodePostfix: postfix });
              }}
              value={props.variableWrapperCodePostfix}
            />
          </div>
        )}
      </Col>
    </Row>
  );
};
