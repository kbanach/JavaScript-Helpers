import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HorizontalInput from '../Form/HorizontalInput';
import {
  resetSettings,
  updateSettings,
  showAdvancedSettings,
  hideAdvancedSettings,
} from './Settings.actions';

class Settings extends React.Component {
  changeLineLength = lineLenStr => {
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
            onChange={filler => {
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
                onChange={generalPrefix => {
                  this.props.onChange({ generalPrefix });
                }}
                value={this.props.generalPrefix}
              />
              <HorizontalInput
                label="General postfix"
                onChange={generalPostfix => {
                  this.props.onChange({ generalPostfix });
                }}
                value={this.props.generalPostfix}
              />
              <HorizontalInput
                label="Line start"
                onChange={lineStart => {
                  this.props.onChange({ lineStart });
                }}
                value={this.props.lineStart}
              />
              <HorizontalInput
                label="Line end"
                onChange={lineEnd => {
                  this.props.onChange({ lineEnd });
                }}
                value={this.props.lineEnd}
              />
              <HorizontalInput
                label="Char escaper"
                onChange={charEscaper => {
                  this.props.onChange({ charEscaper });
                }}
                value={this.props.charEscaper}
              />
              <HorizontalInput
                label="Concatenate variable in log char"
                onChange={variableConcatenateChar => {
                  this.props.onChange({ variableConcatenateChar });
                }}
                value={this.props.variableConcatenateChar}
              />
              <HorizontalInput
                label="Variable wrapper prefix"
                onChange={prefix => {
                  this.props.onChange({ variableWrapperCodePrefix: prefix });
                }}
                value={this.props.variableWrapperCodePrefix}
              />
              <HorizontalInput
                label="Variable wrapper postfix"
                onChange={postfix => {
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

Settings.propTypes = {
  onChange: PropTypes.func.isRequired,
  showAdvanced: PropTypes.func.isRequired,
  hideAdvanced: PropTypes.func.isRequired,

  showAdvancedSettings: PropTypes.bool.isRequired,
  filler: PropTypes.string.isRequired,
  lineLength: PropTypes.number.isRequired,
  lineStart: PropTypes.string.isRequired,
  lineEnd: PropTypes.string.isRequired,
  charEscaper: PropTypes.string.isRequired,
  variableConcatenateChar: PropTypes.string.isRequired,
  variableWrapperCodePrefix: PropTypes.string.isRequired,
  variableWrapperCodePostfix: PropTypes.string.isRequired,
  generalPrefix: PropTypes.string.isRequired,
  generalPostfix: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  showAdvancedSettings: state.settings.showAdvancedSettings,
  ...state.settings.values,
});

const mapDispatchToProps = dispatch => ({
  onChange: newSettingsValues => {
    dispatch(updateSettings(newSettingsValues));
  },
  showAdvanced: () => {
    dispatch(showAdvancedSettings());
  },
  resetForm: () => {
    dispatch(resetSettings());
  },
  hideAdvanced: () => {
    dispatch(hideAdvancedSettings());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
