import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Dispatch } from 'redux';
import {
  SettingsStateProps,
  getShowAdvancedSettings,
  getSettingsValues,
  SettingsDispatchProps,
  updateSettings,
  showAdvancedSettings,
  resetSettings,
  hideAdvancedSettings,
  SettingsValues,
} from '.';
import { SettingsComponent } from './Settings.component';

const mapStateToProps = (state: RootState): SettingsStateProps => ({
  showAdvancedSettings: getShowAdvancedSettings(state),
  ...getSettingsValues(state),
});

const mapDispatchToProps = (dispatch: Dispatch): SettingsDispatchProps => ({
  onChange: (newSettingsValues: Partial<SettingsValues>) => {
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

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsComponent);
