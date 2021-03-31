import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CommentComponentProps } from './Comment.interface';
import { HorizontalInput, INPUT_TYPE } from '../Form/';

export const CommentComponent: React.FC<CommentComponentProps> = (props) => {
  const { resetComment, onChange, comment } = props;

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
                resetComment();
              }}
            >
              Reset comment
            </Button>
          </Col>
        </Row>

        <HorizontalInput
          label="The comment"
          type={INPUT_TYPE.TEXTAREA}
          onChange={(newValue: string) => onChange(newValue)}
          value={comment}
          rows={7}
        />
      </Col>
    </Row>
  );
};
