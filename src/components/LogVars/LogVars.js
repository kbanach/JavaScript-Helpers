import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { resetVars, setVars } from './LogVars.actions';
import HorizontalInput from '../Form/HorizontalInput';
import PropTypes from 'prop-types';

class LogVars extends React.Component {
  render() {
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
                  this.props.resetVariables();
                }}
              >
                Reset variables
              </Button>
            </Col>
          </Row>

          <HorizontalInput
            label="Variable names to log"
            onChange={rawVars => {
              this.props.onChange(rawVars);
            }}
            value={this.props.rawVars}
          />
        </Col>
      </Row>
    );
  }
}

LogVars.propTypes = {
  onChange: PropTypes.func.isRequired,
  resetVariables: PropTypes.func.isRequired,

  vars: PropTypes.arrayOf(PropTypes.string).isRequired,
  rawVars: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  vars: state.vars.vars,
  rawVars: state.vars.rawVars,
});

const mapDispatchToProps = dispatch => ({
  onChange: vars => {
    dispatch(setVars(vars));
  },
  resetVariables: () => {
    dispatch(resetVars());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogVars);
