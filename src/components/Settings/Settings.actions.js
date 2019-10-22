export const SettingsActions = {
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  SHOW_ADVANCED: 'SHOW_ADVANCED_SETTINGS',
  HIDE_ADVANCED: 'HIDE_ADVANCED_SETTINGS',
};

export function updateSettings(settings) {
  return {
    type: SettingsActions.UPDATE_SETTINGS,
    settings,
  };
}

export function showAdvancedSettings() {
  return {
    type: SettingsActions.SHOW_ADVANCED,
  };
}

export function hideAdvancedSettings() {
  return {
    type: SettingsActions.HIDE_ADVANCED,
  };
}
