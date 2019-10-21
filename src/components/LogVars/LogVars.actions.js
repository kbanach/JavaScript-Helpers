export const consLogGenActions = {
  SET_VARS: 'UPDATE_VARS',
};

export function setVars(newVars) {
  return {
    type: consLogGenActions.SET_VARS,
    vars: newVars.split(/[,; ]/ig)
      .map(t => t.trim())
      .filter(Boolean),
  };
}
