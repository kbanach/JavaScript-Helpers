import { BasicSettingsActions } from './BasicSettings.actions';

const basicSettingsInitialState = {
  filler: '*',
  lineLength: 60,
};

export function basicSettings(state = basicSettingsInitialState, action) {
  switch (action.type) {
    case BasicSettingsActions.UPDATE_BASIC_SETTINGS:
      return {
        ...state,
        ...action.settings,
      };
    default:
      return state;
  }
}
