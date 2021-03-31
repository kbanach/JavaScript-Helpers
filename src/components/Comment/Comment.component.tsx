import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CommentProps } from './Comment.interface';
import HorizontalInput, { INPUT_TYPE } from '../Form/HorizontalInput';

export const CommentComponent: React.FC<CommentProps> = (props) => {
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h3>Comment</h3>
          </Col>
          <Col className="text-right">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                props.resetComment();
              }}
            >
              Reset comment
            </Button>
          </Col>
        </Row>

        <HorizontalInput
          label="The comment"
          type={INPUT_TYPE.TEXTAREA}
          onChange={(newValue: string) => props.onChange(newValue)}
          value={props.comment}
          rows={7}
        />
      </Col>
    </Row>
  );
};
