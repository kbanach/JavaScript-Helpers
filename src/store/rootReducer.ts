import { combineReducers } from 'redux';

import { settingsReducer, SettingsState } from '../components/Settings';
import { varsReducer, VarsState } from '../components/LogVars';
import { commentReducer, CommentState } from '../components/Comment';

const reducer = combineReducers({
  settings: settingsReducer,
  vars: varsReducer,
  comment: commentReducer,
});

export interface RootState {
  settings: SettingsState;
  vars: VarsState;
  comment: CommentState;
}

export default reducer;
