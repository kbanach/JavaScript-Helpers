import { connect } from 'react-redux';
import { loadSettingsPreset, PresetNames } from '../Settings';
import { RootState } from '../../store/rootReducer';
import { Dispatch } from 'redux';
import { PresetsComponent } from './Presets.component';
import { PresetsStateProps, PresetsDispatchProps } from '.';

const mapStateToProps = (state: RootState): PresetsStateProps => ({
  activePreset: state.settings.currentPreset,
});

const mapDispatchToProps = (dispatch: Dispatch): PresetsDispatchProps => ({
  changePreset: (preset: PresetNames) => {
    dispatch(loadSettingsPreset(preset));
  },
});

export const Presets = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PresetsComponent);
