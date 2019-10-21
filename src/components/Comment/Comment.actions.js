export const CommentActions = {
  SET_COMMENT: 'UPDATE_COMMENT'
};

export function setComment(comment) {
  return {
    type: CommentActions.SET_COMMENT,
    comment: comment.split('\n')
      .map(t => t.trim())
      .join('\n')
  };
}
