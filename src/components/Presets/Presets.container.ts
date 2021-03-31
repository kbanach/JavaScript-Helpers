import { connect } from 'react-redux';
import { loadSettingsPreset } from '../Settings/Settings.actions';
import { RootState } from '../../store/rootReducer';
import { Dispatch } from 'redux';
import { PresetNames } from '../Settings/Settings.reducers';
import { PresetsComponent } from './Presets.component';

const mapStateToProps = (state: RootState) => ({
  activePreset: state.settings.currentPreset,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changePreset: (preset: PresetNames) => {
    dispatch(loadSettingsPreset(preset));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PresetsComponent);
