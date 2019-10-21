export const BasicSettingsActions = {
  UPDATE_BASIC_SETTINGS: 'UPDATE_BASIC_SETTINGS',
};

export function updateBasicSettings(settings) {
  return {
    type: BasicSettingsActions.UPDATE_BASIC_SETTINGS,
    settings,
  };
}
