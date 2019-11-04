import { SettingsActions } from './Settings.actions';

const settingsInitialState = {
  presetType: 'DEFAULT',
  filler: '*',
  lineLength: 60,
  showAdvancedSettings: false,
  lineStart: 'console.log(',
  lineEnd: ');',
  charEscaper: "'",
  variableConcatenateChar: ", ",
  variableWrapperCodePrefix: "JSON.stringify(",
  variableWrapperCodePostfix: ", null, '\\t')",
};

const presets = {
  BROWSER: {
    presetType: 'BROWSER',
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ", ",
    variableWrapperCodePrefix: "JSON.stringify(",
    variableWrapperCodePostfix: ", null, '\\t')",
  },
  NODEJS: {
    presetType: 'NODEJS',
    lineStart: 'console.log(',
    lineEnd: ');',
    charEscaper: "'",
    variableConcatenateChar: ", ",
    variableWrapperCodePrefix: "require('util').inspect(",
    variableWrapperCodePostfix: ", false, 5)",
  },
  DEFAULT: settingsInitialState,
  CUSTOM: {
    presetType: 'CUSTOM',
  },
};

export const PRESETS = Object.keys(presets);

export function settings(state = presets.DEFAULT, action) {
  switch (action.type) {
    case SettingsActions.LOAD_PRESET:
      return {
        ...state,
        ...(presets[action.preset])
      };
    case SettingsActions.RESET_SETTINGS:
      return {
        ...settingsInitialState,
      };
    case SettingsActions.UPDATE_SETTINGS:
      return {
        ...state,
        ...(presets.CUSTOM),
        ...action.settings,
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
