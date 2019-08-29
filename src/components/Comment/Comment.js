import React from 'react'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const commentActionsJsx = (comment, handleDelete, handleEdit) => {
  return (
    <div>
      <p className="delete-comment" data-id={comment._id} onClick={() => handleDelete(comment._id)}>Delete Comment</p>
      <p className="edit-comment" data-id={comment._id} onClick={() => handleEdit(comment._id)}>Edit Comment</p>
    </div>
  )
}
const Comment = ({ user, comment, handleDelete, handleEdit }) => (
  <Card className="comment">
    <Card.Title>
      {comment.author}
    </Card.Title>
    <Card.Text>{comment.text}</Card.Text>
    {(user && comment) && (user._id === comment.owner)
      ? commentActionsJsx(comment, handleDelete, handleEdit)
      : ''
    }
  </Card>
)

export default Comment
