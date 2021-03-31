import { VarsState } from './LogVars.reducers';

export interface LogVarsStateProps {
  vars: VarsState['vars'];
  rawVars: VarsState['rawVars'];
  bracketsError: VarsState['bracketsError'];
}

export interface LogVarsDispatchProps {
  onChange: (rawVars: VarsState['rawVars']) => void;
  resetVariables: () => void;
}

export interface LogVarsComponentProps
  extends LogVarsStateProps,
    LogVarsDispatchProps {}
