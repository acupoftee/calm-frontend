import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const CommentForm = ({ comment, handleChange, handleSubmit }) => (
  // <h1>CommentForm weeeeeeeee</h1>
  <Card className='comment-card'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="text">
        <Form.Label>Add Comment</Form.Label>
        <Form.Control
          as="textarea"
          value={comment.text}
          onChange={handleChange}
          name="text"
          rows="1"
          placeholder="Comment to your heart's content"
        >
        </Form.Control>
      </Form.Group>

      <Button variant="outline-primary" type="submit">
        Submit
      </Button>
    </Form>
  </Card>
)

export default CommentForm
