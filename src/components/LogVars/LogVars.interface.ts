import { VarsState } from "./LogVars.reducers";

export interface LogVarsProps {
  onChange: (rawVars: VarsState['rawVars']) => void,
  resetVariables: () => void,

  vars: VarsState['vars'],
  rawVars: VarsState['rawVars'],
  bracketsError: VarsState['bracketsError'],
};