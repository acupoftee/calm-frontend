import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const commentActionsJsx = (comment, handleDelete, handleEdit) => {
  return (
    <div>
      <Button variant="outline-danger" data-id={comment._id} onClick={() => handleDelete(comment._id)}>Delete Comment</Button>
      &nbsp;
      <Button variant="outline-primary" data-id={comment._id} onClick={() => handleEdit(comment._id)}>Edit Comment</Button>
    </div>
  )
}

const Comment = (props) => {
  return (
    <Fragment>
      { props.comment
        ? <Card className="comment">
          <Card.Title>
            {props.comment.author}
          </Card.Title>
          <Card.Text>{props.comment.text}</Card.Text>
          {(props.user && props.comment) && (props.user._id === props.comment.owner._id || props.user._id === props.comment.owner)
            ? commentActionsJsx(props.comment, props.handleDelete, props.handleEdit)
            : ''
          }
        </Card>
        : ''}
    </Fragment>
  )
}

export default Comment
