export interface SettingsValues {
  presetFullName: string;
  filler: string;
  lineLength: number;
  lineStart: string;
  lineEnd: string;
  charEscaper: string;
  variableConcatenateChar: string;
  variableWrapperCodePrefix: string;
  variableWrapperCodePostfix: string;
  generalPrefix: string;
  generalPostfix: string;
}

export enum PresetNames {
  BROWSER = 'BROWSER',
  NODEJS = 'NODEJS',
  REACT_RENDER = 'REACT_RENDER',
  DEFAULT = 'DEFAULT',
  CUSTOM = 'CUSTOM',
}

export interface SettingsState {
  currentPreset: PresetNames;
  showAdvancedSettings: boolean;
  values: SettingsValues;
}

export interface SettingsStateProps extends SettingsValues {
  showAdvancedSettings: SettingsState['showAdvancedSettings'];
}

export interface SettingsDispatchProps {
  onChange: (newSettingsValues: Partial<SettingsValues>) => void;
  resetForm: () => void;
  showAdvanced: () => void;
  hideAdvanced: () => void;
}

export interface SettingsComponentProps
  extends SettingsStateProps,
    SettingsDispatchProps {}
