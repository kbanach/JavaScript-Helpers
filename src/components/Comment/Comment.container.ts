import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../store/rootReducer';
import { CommentState } from './Comment.reducers';
import { CommentComponent } from './Comment.component';
import { setComment, resetComment } from './Comment.actions';
import { getComment } from './Comment.selectors';

const mapStateToProps = (state: RootState) => ({
  comment: getComment(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: (comment: CommentState) => {
    dispatch(setComment(comment));
  },
  resetComment: () => {
    dispatch(resetComment());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
