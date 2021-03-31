import { connect } from 'react-redux';
import { OutputComponent } from './Output.component';
import { RootState } from '../../store/rootReducer';
import { getVars } from '../LogVars/LogVars.selectors';
import { getComment } from '../Comment/Comment.selectors';
import { getSettingsValues } from '../Settings/Settings.selectors';
import { OutputComponentStateProps } from './Output.interface';

const mapStateToProps = (state: RootState): OutputComponentStateProps => ({
  vars: getVars(state),
  comment: getComment(state),
  settings: getSettingsValues(state),
});

export default connect(mapStateToProps)(OutputComponent);
