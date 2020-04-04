import { consLogGenActions } from './LogVars.actions';
import { AnyAction } from 'redux';

const varsInitialState: VarsState = {
  vars: [],
  rawVars: '',
};

export interface VarsState {
  vars: string[];
  rawVars: string;
};

export function vars(state = varsInitialState, action: AnyAction): VarsState {
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
