import { combineReducers } from 'redux';

import { settings, SettingsState } from '../components/Settings/Settings.reducers';
import { vars, VarsState } from '../components/LogVars/LogVars.reducers';
import { comment, CommentState } from '../components/Comment/Comment.reducers';

const reducer = combineReducers({
  settings,
  vars,
  comment,
});

export interface RootState {
  settings: SettingsState,
  vars: VarsState,
  comment: CommentState,
};

export default reducer;
