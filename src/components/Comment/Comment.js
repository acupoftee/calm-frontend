import React from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Comment = ({ user, comment, handleDelete }) => (
  <Card className="comment">
    <Card.Title>
      {comment.author}
    </Card.Title>
    <Card.Text>{comment.text}</Card.Text>
    {(user && comment) && (user._id === comment.owner)
      ? <p className="delete-comment" data-id={comment._id} onClick={() => handleDelete(comment._id)}>Delete Comment</p>
      : ''
    }
  </Card>
)

export default Comment
