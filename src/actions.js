export const consLogGenActions = {
  SET_VARS: 'UPDATE_VARS',
};

export function setConsoleLogVars(newVars) {
  return {
    type: consLogGenActions.SET_VARS,
    vars: newVars.split(/[,; ]/ig)
      .map(t => t.trim())
      .filter(Boolean),
  };
}
