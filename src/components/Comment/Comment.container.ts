import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/rootReducer";
import { CommentState } from "./Comment.reducers";
import { CommentComponent } from "./Comment.component";
import { setComment, resetComment } from "./Comment.actions";

const mapStateToProps = (state: RootState) => ({
  comment: state.comment,
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