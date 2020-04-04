import { SettingsActions } from './Settings.actions';
import { AnyAction } from 'redux';
import { Settings } from './Settings.interface';

export enum PresetNames {
  BROWSER = 'BROWSER',
  NODEJS = 'NODEJS',
  REACT_RENDER = 'REACT_RENDER',
  DEFAULT = 'DEFAULT',
  CUSTOM = 'CUSTOM',
};

const settingsInitialState = {
  currentPreset: PresetNames.DEFAULT,
  showAdvancedSettings: false,
  values: {
    presetFullName: 'Default',
    filler: '*',
    lineLength: 60,
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ', ',
    variableWrapperCodePrefix: 'JSON.stringify(',
    variableWrapperCodePostfix: ", null, '\\t')",
    generalPrefix: '',
    generalPostfix: '',
  },
};

export interface SettingsState {
  currentPreset: PresetNames;
  showAdvancedSettings: boolean;
  values: Settings;
};


const presetsValues: { 
  [key in PresetNames]: Partial<Settings> 
} = {
  BROWSER: {
    presetFullName: 'Browser',
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ', ',
    variableWrapperCodePrefix: 'JSON.stringify(',
    variableWrapperCodePostfix: ", null, '\\t')",
    generalPrefix: '',
    generalPostfix: '',
  },
  NODEJS: {
    presetFullName: 'NodeJS',
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ', ',
    variableWrapperCodePrefix: 'util.inspect(',
    variableWrapperCodePostfix: ', false, 5)',
    generalPrefix: "const util = require('util');",
    generalPostfix: '',
  },
  REACT_RENDER: {
    presetFullName: 'React render() log',
    lineStart: '',
    lineEnd: '<br />',
    charEscaper: '',
    variableConcatenateChar: '',
    variableWrapperCodePrefix: '{JSON.stringify(',
    variableWrapperCodePostfix: ", null, '\\t')}",
    generalPrefix: '<pre>',
    generalPostfix: '</pre>',
  },
  DEFAULT: {
    ...settingsInitialState.values,
  },
  CUSTOM: {
    presetFullName: 'Custom',
  },
};

export function getPreset(presetName: PresetNames) {
  return presetsValues[presetName];
}

export function settings(state = settingsInitialState, action: AnyAction): SettingsState {
  switch (action.type) {
    case SettingsActions.LOAD_PRESET:
      return {
        ...state,
        currentPreset: action.preset,
        values: {
          ...state.values,
          ...getPreset(action.preset),
        },
      };
    case SettingsActions.RESET_SETTINGS:
      return {
        ...settingsInitialState,
      };
    case SettingsActions.UPDATE_SETTINGS:
      return {
        ...state,
        currentPreset: PresetNames.CUSTOM,
        values: {
          ...state.values,
          ...getPreset(PresetNames.CUSTOM),
          ...action.newSettingsValues,
        },
      };
    case SettingsActions.SHOW_ADVANCED:
      return {
        ...state,
        showAdvancedSettings: true,
      };
    case SettingsActions.HIDE_ADVANCED:
      return {
        ...state,
        showAdvancedSettings: false,
      };
    default:
      return state;
  }
}
