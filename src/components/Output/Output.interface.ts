import { CommentState } from '../Comment/Comment.reducers';
import { VarsState } from '../LogVars/LogVars.reducers';
import { Settings } from '../Settings/Settings.interface';
import { SettingsState } from '../Settings/Settings.reducers';

export interface OutputComponentStateProps {
  vars: VarsState['vars'];
  comment: CommentState;
  settings: SettingsState['values'];
}

export interface OutputComponentProps extends OutputComponentStateProps {}
