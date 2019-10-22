import React from 'react';
import { connect } from 'react-redux';
import { setVars } from './LogVars.actions';
import HorizontalInput from '../Form/HorizontalInput';
import PropTypes from 'prop-types';

class LogVars extends React.Component {
  render() {
    return (
      <HorizontalInput
        label="Variable names to log"
        onChange={(rawVars) => { this.props.onChange(rawVars) }}
        value={this.props.rawVars}
      />
    );
  }
}

LogVars.propTypes = {
  onChange: PropTypes.func.isRequired,

  vars: PropTypes.arrayOf(PropTypes.string).isRequired,
  rawVars: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  vars: state.vars.vars,
  rawVars: state.vars.rawVars,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (vars) => {
    dispatch(setVars(vars))
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogVars);
