import { connect } from 'react-redux';
import { OutputComponent } from './Output.component';
import { RootState } from '../../store/rootReducer';

const mapStateToProps = (state: RootState) => ({
  vars: state.vars.vars,
  comment: state.comment,
  settings: state.settings.values,
});

export default connect(mapStateToProps)(OutputComponent);
