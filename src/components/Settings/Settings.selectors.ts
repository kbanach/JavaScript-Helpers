import { RootState } from '../../store/rootReducer';

export const getSettings = (state: RootState) => state.settings;

export const getShowAdvancedSettings = (state: RootState) =>
  getSettings(state).showAdvancedSettings;

export const getSettingsValues = (state: RootState) =>
  getSettings(state).values;
