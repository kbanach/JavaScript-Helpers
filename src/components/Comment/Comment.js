import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import HorizontalInput, { INPUT_TYPE } from '../Form/HorizontalInput';
import { resetComment, setComment } from './Comment.actions';

const Comment = (props) => {
  return (
    <Row>
    <Col>
      <Row>
        <Col><h3>Comment</h3></Col>
        <Col className='text-right'>
          <Button variant='outline-danger'
            size='sm'
            onClick={() => {props.resetComment()}}>
              Reset comment
          </Button>
        </Col>
      </Row>

      <HorizontalInput
        label='The comment'
        type={INPUT_TYPE.TEXTAREA}
        onChange={props.onChange}
        value={props.comment}
        rows={7}
      />
    </Col>
  </Row>
  );
}

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  resetComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comment: state.comment
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (comment) => {
    dispatch(setComment(comment));
  },
  resetComment: () => {
    dispatch(resetComment());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
