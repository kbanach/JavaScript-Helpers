import { consLogGenActions } from './LogVars.actions';

const varsInitialState = [];

export function vars(state = varsInitialState, action) {
  switch (action.type) {
    case consLogGenActions.SET_VARS:
      return [...action.vars];
    default:
      return state;
  }
}

