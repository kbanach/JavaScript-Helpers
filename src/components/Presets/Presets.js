import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { loadSettingsPreset } from '../Settings/Settings.actions';
import { PRESETS } from '../Settings/Settings.reducers';

class Presets extends React.Component {
  render() {
    return (
    <Row>
      <Col className="d-flex flex-column">
        <h3>Presets</h3>

        <ButtonGroup size="sm" className="mt-3">
          {PRESETS.map(
            (p, k) => {
              if (this.props.activePreset === p) {
                return <Button key={k}>{p}</Button>;
              }

              return (
                <Button variant='outline-primary' key={k} onClick={() => this.props.changePreset(p)}>{p}</Button>
              );
            }
          )}
        </ButtonGroup>
        <br />
      </Col>
    </Row>);
  }
}

Presets.propTypes = {
  changePreset: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activePreset: state.settings.presetType,
});

const mapDispatchToProps = (dispatch) => ({
  changePreset: (preset) => {
    dispatch(loadSettingsPreset(preset));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Presets);
