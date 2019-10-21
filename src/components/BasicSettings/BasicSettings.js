import React from 'react';
import { connect } from 'react-redux';
import HorizontalInput from '../Form/HorizontalInput';
import { updateBasicSettings } from './BasicSettings.actions';

class BasicSettings extends React.Component {
  changeFiller = (e) => {
    e.preventDefault();
    this.props.onChange({
      filler: e.target.value
    });
  }

  changeLineLength = (e) => {
    e.preventDefault();
    this.props.onChange({
      lineLength: e.target.value
    });
  }

  render() {
    return (
      <div>
        <HorizontalInput
          label='Char to use as filler'
          onChange={this.changeFiller}
          value={this.props.filler}
        />

        <HorizontalInput
          label='Line length'
          onChange={this.changeLineLength}
          value={this.props.lineLength}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  ...state.basicSettings,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (settings) => {
    dispatch(updateBasicSettings(settings));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicSettings);
