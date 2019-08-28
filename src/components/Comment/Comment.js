import React from 'react'
import Card from 'react-bootstrap/Card'

const Comment = ({ comment }) => (
  <Card className="comment">
    <Card.Title>
      {comment.author}
    </Card.Title>
    <Card.Text>{comment.text}</Card.Text>
  </Card>
)

export default Comment
