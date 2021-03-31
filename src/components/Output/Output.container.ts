import { connect } from 'react-redux';
import { OutputComponent } from './Output.component';
import { RootState } from '../../store/rootReducer';
import { getVars } from '../LogVars';
import { getComment } from '../Comment';
import { getSettingsValues } from '../Settings';
import { OutputComponentStateProps } from './Output.interface';

const mapStateToProps = (state: RootState): OutputComponentStateProps => ({
  vars: getVars(state),
  comment: getComment(state),
  settings: getSettingsValues(state),
});

export const Output = connect(mapStateToProps)(OutputComponent);
