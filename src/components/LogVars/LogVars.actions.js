export const consLogGenActions = {
  RESET_VARS: 'RESET_VARS',
  SET_VARS: 'UPDATE_VARS',
};


export function resetVars() {
  return {
    type: consLogGenActions.RESET_VARS,
  };
}


export function setVars(rawVars) {
  return {
    type: consLogGenActions.SET_VARS,
    rawVars,
    vars: rawVars.split(/[,; ]/ig)
      .map(t => t.trim())
      .filter(Boolean),
  };
}
