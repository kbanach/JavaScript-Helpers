import { CommentActions } from './Comment.actions';
import { AnyAction } from 'redux';

const commentInitialState = 'your comment';

export type CommentState = string;

export function commentReducer(state = commentInitialState, action: AnyAction) {
  switch (action.type) {
    case CommentActions.RESET_COMMENT:
      return commentInitialState;
    case CommentActions.SET_COMMENT:
      return action.comment;
    default:
      return state;
  }
}
