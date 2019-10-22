import { SettingsActions } from './Settings.actions';

const settingsInitialState = {
  filler: '*',
  lineLength: 60,
  showAdvancedSettings: true,
  lineStart: 'console.log(',
  lineEnd: ');',
  charEscaper: "'",
  variableConcatenateChar: ", ",
  variableWrapperCodePrefix: "JSON.stringify(",
  variableWrapperCodePostfix: ", false, '\\t')",
};

export function settings(state = settingsInitialState, action) {
  switch (action.type) {
    case SettingsActions.UPDATE_SETTINGS:
      return {
        ...state,
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
