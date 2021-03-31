import { consLogGenActions } from './LogVars.actions';
import { AnyAction } from 'redux';

const varsInitialState: VarsState = {
  vars: [],
  rawVars: '',
  bracketsError: '',
};

export interface VarsState {
  vars: string[];
  rawVars: string;
  bracketsError: string;
};

export function vars(state = varsInitialState, action: AnyAction): VarsState {
  switch (action.type) {
    case consLogGenActions.RESET_VARS:
      return {
        ...varsInitialState,
      };
    case consLogGenActions.UPDATE_VARS:
      return {
        ...state,
        vars: [...action.vars],
        rawVars: action.rawVars,
        bracketsError: action.bracketsError,
      };
    default:
      return state;
  }
}
