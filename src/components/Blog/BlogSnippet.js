import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const BlogSnippet = ({ blog }) => (
  <Card className="blog-snippet">
    <Card.Title>
      <Link to={`/blogs/${blog._id}`}>
        {blog.title}
      </Link>
    </Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
    <Card.Text>{blog.text}</Card.Text>
  </Card>
)

export default BlogSnippet
