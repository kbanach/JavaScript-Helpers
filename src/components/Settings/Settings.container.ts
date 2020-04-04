import { connect } from "react-redux";
import { SettingsComponent } from './Settings.component';
import { RootState } from "../../store/rootReducer";
import { Dispatch } from "redux";
import { Settings } from "./Settings.interface";
import { updateSettings, resetSettings, showAdvancedSettings, hideAdvancedSettings } from "./Settings.actions";

const mapStateToProps = (state: RootState) => ({
  showAdvancedSettings: state.settings.showAdvancedSettings,
  ...state.settings.values,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
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