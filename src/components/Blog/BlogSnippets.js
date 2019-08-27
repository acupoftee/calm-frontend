import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

class BlogSnippets extends Component {
  state = {
    blogSnippets: []
  }

  async componentDidMount () {
    try {
      // await the blog response from the API call
      const response = await axios(`${apiUrl}/blogs`)
      // add the blogs to the blogSnippets state prop
      this.setState({ blogSnippets: response.data.blogs })
    } catch (error) {
      // TODO: no console errors
      console.error(error)
    }
  }

  render () {
    const blogSnippetsJsx = this.state.blogSnippets.map(blog => (
      <Card className="blog-snippet" key={blog._id}>
        <Card.Title>
          <Link to={`/blogs/${blog._id}`}>
            {blog.title}
          </Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
        <Card.Text>{blog.text}</Card.Text>
      </Card>
    ))

    // if (this.state.loading) {
    //   return (
    //     <Spinner animation="border" variant="primary" />
    //   )
    // }

    return (
      <Fragment>
        {this.state.blogSnippets.length ? blogSnippetsJsx : <Spinner animation="border" variant="primary" /> }
      </Fragment>
    )
  }
}

// const BlogSnippet = ({ title, author, createdAt, text }) => (
//   <div>
//     <h1>{title}</h1>
//     <small>{author} - {createdAt}</small>
//     <p>{text}</p>
//   </div>
// )

export default BlogSnippets
