import { consLogGenActions } from './LogVars.actions';

const varsInitialState = {
  vars: [],
  rawVars: '',
};

export function vars(state = varsInitialState, action) {
  switch (action.type) {
    case consLogGenActions.RESET_VARS:
      return {
        ...varsInitialState,
      };
    case consLogGenActions.SET_VARS:
      return {
        vars: [...action.vars],
        rawVars: action.rawVars,
      };
    default:
      return state;
  }
}

