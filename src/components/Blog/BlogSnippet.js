import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import moment from 'moment'

const BlogSnippet = ({ blog }) => (
  <Card className="blog-snippet">
    <Card.Title>
      <Link className="blog-snippet-title" to={`/blogs/${blog._id}`}>
        {blog.title}
      </Link>
    </Card.Title>
    <Card.Subtitle className="blog-snippet-text mb-2 text-muted">
      {blog.text.slice(0, 100) + (blog.text.length > 200 ? '...' : '')}
    </Card.Subtitle>
    <Card.Text className="blog-snippet-author">By {blog.author}</Card.Text>
    <footer className="blog-snippet-footer">
      {moment(blog.createdAt).format('MMM Do YYYY')}
    </footer>
  </Card>
)

export default BlogSnippet
