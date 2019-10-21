import { combineReducers } from 'redux';

import { basicSettings } from './components/BasicSettings/BasicSettings.reducers';
import { vars } from './components/LogVars/LogVars.reducers';
import { comment } from './components/Comment/Comment.reducers';

const reducer = combineReducers({
  basicSettings,
  vars,
  comment,
});

export default reducer;
