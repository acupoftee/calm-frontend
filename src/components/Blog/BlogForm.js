import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = ({ blog, handleChange, handleSubmit }) => (
  // <h1>BlogForm weeeeeeeee</h1>
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Blog Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter a title"
        value={blog.title}
        onChange={handleChange}
        name="title"
        required
      />
    </Form.Group>

    <Form.Group controlId="text">
      <Form.Label>Blog Text</Form.Label>
      <Form.Control
        as="textarea"
        onChange={handleChange}
        name="text"
        rows="20"
        defaultValue={blog.text}
      >
      </Form.Control>
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
)

export default BlogForm
