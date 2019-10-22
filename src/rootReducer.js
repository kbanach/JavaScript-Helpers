import { combineReducers } from 'redux';

import { settings } from './components/Settings/Settings.reducers';
import { vars } from './components/LogVars/LogVars.reducers';
import { comment } from './components/Comment/Comment.reducers';

const reducer = combineReducers({
  settings,
  vars,
  comment,
});

export default reducer;
