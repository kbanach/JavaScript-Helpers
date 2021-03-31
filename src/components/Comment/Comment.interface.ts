import { CommentState } from './Comment.reducers';

export interface CommentComponentProps {
  comment: CommentState;
  onChange: (newComment: CommentState) => void;
  resetComment: () => void;
}
