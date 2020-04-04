import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Settings } from './Settings.interface';
import HorizontalInput from '../Form/HorizontalInput';

export class SettingsComponent extends React.Component<any, any> {
  changeLineLength = (lineLenStr: string) => {
    let lineLength = parseInt(lineLenStr);

    if (isNaN(lineLength)) {
      lineLength = 0;
    }

    this.props.onChange({
      lineLength,
    });
  };

  render() {
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
                onClick={this.props.resetForm}
              >
                Reset settings
              </Button>
            </Col>
          </Row>

          <HorizontalInput
            label="Char to use as filler"
            onChange={(filler: Settings['filler']) => {
              this.props.onChange({ filler });
            }}
            value={this.props.filler}
          />

          <HorizontalInput
            label="Line length"
            onChange={this.changeLineLength}
            value={this.props.lineLength}
          />

          <Row>
            <Col>
              <h3>Advanced settings</h3>
            </Col>
            <Col className="text-right">
              {this.props.showAdvancedSettings ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={this.props.hideAdvanced}
                >
                  Hide advanced settings
                </Button>
              ) : (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={this.props.showAdvanced}
                  >
                    Show advanced settings
                  </Button>
                )}
            </Col>
          </Row>

          {this.props.showAdvancedSettings && (
            <div>
              <HorizontalInput
                label="General prefix"
                onChange={(generalPrefix: Settings['generalPrefix']) => {
                  this.props.onChange({ generalPrefix });
                }}
                value={this.props.generalPrefix}
              />
              <HorizontalInput
                label="General postfix"
                onChange={(generalPostfix: Settings['generalPostfix']) => {
                  this.props.onChange({ generalPostfix });
                }}
                value={this.props.generalPostfix}
              />
              <HorizontalInput
                label="Line start"
                onChange={(lineStart: Settings['lineStart']) => {
                  this.props.onChange({ lineStart });
                }}
                value={this.props.lineStart}
              />
              <HorizontalInput
                label="Line end"
                onChange={(lineEnd: Settings['lineEnd']) => {
                  this.props.onChange({ lineEnd });
                }}
                value={this.props.lineEnd}
              />
              <HorizontalInput
                label="Char escaper"
                onChange={(charEscaper: Settings['charEscaper']) => {
                  this.props.onChange({ charEscaper });
                }}
                value={this.props.charEscaper}
              />
              <HorizontalInput
                label="Concatenate variable in log char"
                onChange={(variableConcatenateChar: Settings['variableConcatenateChar']) => {
                  this.props.onChange({ variableConcatenateChar });
                }}
                value={this.props.variableConcatenateChar}
              />
              <HorizontalInput
                label="Variable wrapper prefix"
                onChange={(prefix: Settings['variableWrapperCodePrefix']) => {
                  this.props.onChange({ variableWrapperCodePrefix: prefix });
                }}
                value={this.props.variableWrapperCodePrefix}
              />
              <HorizontalInput
                label="Variable wrapper postfix"
                onChange={(postfix: Settings['variableWrapperCodePostfix']) => {
                  this.props.onChange({ variableWrapperCodePostfix: postfix });
                }}
                value={this.props.variableWrapperCodePostfix}
              />
            </div>
          )}
        </Col>
      </Row>
    );
  }
}
