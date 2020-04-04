import { CommentActions } from './Comment.actions';

const commentInitialState = 'your comment';

export function comment(state = commentInitialState, action) {
  switch (action.type) {
    case CommentActions.RESET_COMMENT:
      return commentInitialState;
    case CommentActions.SET_COMMENT:
      return action.comment;
    default:
      return state;
  }
}
