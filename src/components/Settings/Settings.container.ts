import { connect } from 'react-redux';
import { SettingsComponent } from './Settings.component';
import { RootState } from '../../store/rootReducer';
import { Dispatch } from 'redux';
import {
  Settings,
  SettingsDispatchProps,
  SettingsStateProps,
} from './Settings.interface';
import {
  updateSettings,
  resetSettings,
  showAdvancedSettings,
  hideAdvancedSettings,
} from './Settings.actions';
import {
  getSettingsValues,
  getShowAdvancedSettings,
} from './Settings.selectors';

const mapStateToProps = (state: RootState): SettingsStateProps => ({
  showAdvancedSettings: getShowAdvancedSettings(state),
  ...getSettingsValues(state),
});

const mapDispatchToProps = (dispatch: Dispatch): SettingsDispatchProps => ({
  onChange: (newSettingsValues: Partial<Settings>) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
