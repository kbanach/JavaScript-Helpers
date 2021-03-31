import { PresetNames } from '../Settings';

export interface PresetsStateProps {
  activePreset: PresetNames;
}

export interface PresetsDispatchProps {
  changePreset: (presetToLoad: PresetNames) => void;
}

export interface PresetsComponentProps
  extends PresetsStateProps,
    PresetsDispatchProps {}
