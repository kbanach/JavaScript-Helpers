import { CommentState } from "./Comment.reducers";

export interface CommentProps {
  comment: CommentState;
  onChange: (newComment: CommentState) => void,
  resetComment: () => void,
};