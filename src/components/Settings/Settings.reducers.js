import { SettingsActions } from './Settings.actions';

const settingsInitialState = {
  currentPreset: 'DEFAULT',
  showAdvancedSettings: false,
  values: {
    presetType: 'Default',
    filler: '*',
    lineLength: 60,
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ", ",
    variableWrapperCodePrefix: "JSON.stringify(",
    variableWrapperCodePostfix: ", null, '\\t')",
    generalPrefix: "",
    generalPostfix: "",
  }
};

const presetsValues = {
  BROWSER: {
    presetType: 'Browser',
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ", ",
    variableWrapperCodePrefix: "JSON.stringify(",
    variableWrapperCodePostfix: ", null, '\\t')",
    generalPrefix: "",
    generalPostfix: "",
  },
  NODEJS: {
    presetType: 'NodeJS',
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ", ",
    variableWrapperCodePrefix: "util.inspect(",
    variableWrapperCodePostfix: ", false, 5)",
    generalPrefix: "const util = require('util');",
  },  
  REACT_RENDER: {
    presetType: 'React render() log',
    lineStart: '',
    lineEnd: '<br />',
    charEscaper: "",
    variableConcatenateChar: "",
    variableWrapperCodePrefix: "{JSON.stringify(",
    variableWrapperCodePostfix: ", null, '\\t')}",
    generalPrefix: "<pre>",
    generalPostfix: "</pre>",
  },
  DEFAULT: {
    ...settingsInitialState.values
  },
  CUSTOM: {
    presetType: 'Custom',
  },
};

export const PRESETS = Object.keys(presetsValues).reduce((prevValue, newValue) => {
  return {...prevValue, [newValue]: presetsValues[newValue].presetType};
}, {});

export function settings(state = settingsInitialState, action) {
  switch (action.type) {
    case SettingsActions.LOAD_PRESET:
      return {
        ...state,
        currentPreset: action.preset,
        values: {
          ...state.values,
          ...presetsValues[action.preset],
        }
      };
    case SettingsActions.RESET_SETTINGS:
      return {
        ...settingsInitialState,
      };
    case SettingsActions.UPDATE_SETTINGS:
      return {
        ...state,
        values: {
          ...state.values,
          ...presetsValues.CUSTOM,
          ...action.newSettingsValues,
        }
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
