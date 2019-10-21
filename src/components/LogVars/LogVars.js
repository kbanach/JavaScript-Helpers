import React from 'react';
import { connect } from 'react-redux';
import { setVars } from './LogVars.actions';
import HorizontalInput from '../Form/HorizontalInput';

class LogVars extends React.Component {
  state = {
    vars: '',
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      vars: e.target.value,
    })
  }

  send = () => {
    this.props.onChange(this.state.vars);
  }

  render() {
    return (
      <HorizontalInput
        label="Variable names to log"
        onBlur={this.send}
        onChange={this.onChange}
        value={this.state.vars}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  vars: state.vars.join(', ')
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (vars) => {
    dispatch(setVars(vars))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogVars);
