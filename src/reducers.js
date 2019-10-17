import { combineReducers } from 'redux';
import { consLogGenActions } from './actions';

const consoleLogsGeneratorInitialState = {
  vars: [],
};

function consoleLogsGenerator(state = consoleLogsGeneratorInitialState, action) {
  switch (action.type) {
    case consLogGenActions.SET_VARS:
      return {
        ...state,
        vars: [ ...action.vars ]
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  consoleLogsGenerator,
});

export default reducer;
