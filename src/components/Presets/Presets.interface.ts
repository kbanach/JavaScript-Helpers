import { PresetNames } from '../Settings/Settings.reducers';

export interface PresetsComponentProps {
  activePreset: PresetNames;

  changePreset: (presetToLoad: PresetNames) => void;
}
