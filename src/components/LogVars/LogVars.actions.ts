import { VarsState } from "./LogVars.reducers";

export const consLogGenActions = {
  RESET_VARS: 'RESET_VARS',
  SET_VARS: 'UPDATE_VARS',
};

export function resetVars() {
  return {
    type: consLogGenActions.RESET_VARS,
  };
}

export function setVars(rawVars: VarsState['rawVars']) {
  return {
    type: consLogGenActions.SET_VARS,
    rawVars,
    vars: rawVars
      .split(/[,; ]/gi)
      .map(t => t.trim())
      .filter(Boolean),
  };
}