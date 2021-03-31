import { RootState } from '../../store/rootReducer';

export const getVars = (state: RootState) => state.vars.vars;

export const getRawVars = (state: RootState) => state.vars.rawVars;

export const getBracketsError = (state: RootState) => state.vars.bracketsError;
