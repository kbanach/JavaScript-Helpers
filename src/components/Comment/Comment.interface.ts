import { CommentState } from './Comment.reducers';

export interface CommentComponentStateProps {
  comment: CommentState;
}

export interface CommentComponentDispatchProps {
  onChange: (newComment: CommentState) => void;
  resetComment: () => void;
}

export interface CommentComponentProps
  extends CommentComponentStateProps,
    CommentComponentDispatchProps {}
