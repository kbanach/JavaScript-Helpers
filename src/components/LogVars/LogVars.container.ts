import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Dispatch } from 'redux';
import { VarsState } from './LogVars.reducers';
import { LogVarsComponent } from './LogVars.component';
import { setVars, resetVars } from './LogVars.actions';
import { getBracketsError, getRawVars, getVars } from './LogVars.selectors';
import { LogVarsStateProps, LogVarsDispatchProps } from './LogVars.interface';

const mapStateToProps = (state: RootState): LogVarsStateProps => ({
  vars: getVars(state),
  rawVars: getRawVars(state),
  bracketsError: getBracketsError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): LogVarsDispatchProps => ({
  onChange: (vars: VarsState['rawVars']) => {
    dispatch(setVars(vars));
  },
  resetVariables: () => {
    dispatch(resetVars());
  },
});

export const LogVars = connect(mapStateToProps, mapDispatchToProps)(LogVarsComponent);
