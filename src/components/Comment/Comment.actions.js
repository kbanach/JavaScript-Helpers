export const CommentActions = {
  RESET_COMMENT: 'RESET_COMMENT',
  SET_COMMENT: 'UPDATE_COMMENT',
};

export function resetComment(comment) {
  return {
    type: CommentActions.RESET_COMMENT,
  };
}
export function setComment(comment) {
  return {
    type: CommentActions.SET_COMMENT,
    comment,
  };
}
