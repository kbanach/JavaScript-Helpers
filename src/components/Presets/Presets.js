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
    const buttons = [];
  
    for (const key of Object.keys(PRESETS)) {
      if (this.props.activePreset === key) {
        buttons.push(<Button key={key}>{PRESETS[key]}</Button>);
      } else {
        buttons.push(
          <Button key={key} variant='outline-primary' 
            onClick={() => this.props.changePreset(key)}
          >{PRESETS[key]}</Button>
        )
      }
    }

    return (
    <Row>
      <Col className="d-flex flex-column">
        <h3>Presets</h3>
        <ButtonGroup size="sm" className="mt-3">
          {buttons}
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
  activePreset: state.settings.currentPreset,
});

const mapDispatchToProps = (dispatch) => ({
  changePreset: (preset) => {
    dispatch(loadSettingsPreset(preset));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Presets);
