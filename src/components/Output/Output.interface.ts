import { CommentState } from "../Comment";
import { VarsState } from "../LogVars";
import { SettingsState } from "../Settings";

export interface OutputComponentStateProps {
  vars: VarsState['vars'];
  comment: CommentState;
  settings: SettingsState['values'];
}

export interface OutputComponentProps extends OutputComponentStateProps {}
