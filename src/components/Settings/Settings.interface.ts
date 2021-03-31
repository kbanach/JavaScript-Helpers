import { SettingsState } from './Settings.reducers';

export interface Settings {
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

export interface SettingsStateProps extends Settings {
  showAdvancedSettings: SettingsState['showAdvancedSettings'];
}

export interface SettingsDispatchProps {
  onChange: (newSettingsValues: Partial<Settings>) => void;
  resetForm: () => void;
  showAdvanced: () => void;
  hideAdvanced: () => void;
}

export interface SettingsComponentProps
  extends SettingsStateProps,
    SettingsDispatchProps {}
