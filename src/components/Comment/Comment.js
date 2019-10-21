import React from 'react';
import { connect } from 'react-redux';
import HorizontalInput, { INPUT_TYPE } from '../Form/HorizontalInput';
import { setComment } from './Comment.actions';

class Comment extends React.Component {
  onChange = (e) => {
    e.preventDefault();
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <HorizontalInput
        label='The comment'
        type={INPUT_TYPE.TEXTAREA}
        onChange={this.onChange}
        value={this.props.comment}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  comment: state.comment
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (comment) => {
    dispatch(setComment(comment));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
