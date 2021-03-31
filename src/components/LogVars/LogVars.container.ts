import { connect } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { Dispatch } from "redux";
import { VarsState } from "./LogVars.reducers";
import { LogVarsComponent } from "./LogVars.component";
import { setVars, resetVars } from "./LogVars.actions";

const mapStateToProps = (state: RootState) => ({
  vars: state.vars.vars,
  rawVars: state.vars.rawVars,
  bracketsError: state.vars.bracketsError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: (vars: VarsState['rawVars']) => {
    dispatch(setVars(vars));
  },
  resetVariables: () => {
    dispatch(resetVars());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(LogVarsComponent);
