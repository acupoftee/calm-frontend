import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import moment from 'moment'

const commentActionsJsx = (comment, handleDelete, handleEdit) => {
  return (
    <Button variant="outline-danger" className="delete-comment" data-id={comment._id} onClick={() => handleDelete(comment._id)}>Delete Comment</Button>
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
          <Card.Subtitle>
            <small>{moment(props.comment.createdAt).format('MMM Do YYYY h:mm a')}</small>
          </Card.Subtitle>
          {(props.user && props.comment) && (props.user._id === props.comment.owner._id || props.user._id === props.comment.owner)
            ? commentActionsJsx(props.comment, props.handleDelete)
            : ''
          }
        </Card>
        : ''}
    </Fragment>
  )
}

export default Comment
