import React from 'react';
import { connect } from 'react-redux';
import HorizontalInput, { INPUT_TYPE } from '../Form/HorizontalInput';
import { setComment } from './Comment.actions';

class Comment extends React.Component {
  state = {
    comment: ''
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      comment: e.target.value,
    })
  }

  send = () => {
    this.props.onChange(this.state.comment);
  }

  render() {
    return (
      <HorizontalInput
        label='The comment'
        type={INPUT_TYPE.TEXTAREA}
        onBlur={this.send}
        onChange={this.onChange}
        value={this.state.comment}
      />
    );
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  onChange: (comment) => {
    dispatch(setComment(comment));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
