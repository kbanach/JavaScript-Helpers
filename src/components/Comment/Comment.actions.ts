import { CommentState } from './Comment.reducers';

export const CommentActions = {
  RESET_COMMENT: 'RESET_COMMENT',
  SET_COMMENT: 'UPDATE_COMMENT',
};

export function resetComment() {
  return {
    type: CommentActions.RESET_COMMENT,
  };
}
export function setComment(comment: CommentState) {
  return {
    type: CommentActions.SET_COMMENT,
    comment,
  };
}
