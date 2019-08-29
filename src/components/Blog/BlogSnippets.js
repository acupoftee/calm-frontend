import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BlogSnippet from './BlogSnippet'

// import ListGroup from 'react-bootstrap/ListGroup'
// import Card from 'react-bootstrap/Card'
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
      this.props.alert({
        heading: 'Error',
        message: 'There was a problem loading blogs.',
        variant: 'danger'
      })
    }
  }

  render () {
    const blogSnippetsJsx = this.state.blogSnippets.map(blog => (
      <BlogSnippet blog={blog} key={blog._id}/>
    ))
    return (
      <Fragment>
        {this.state.blogSnippets.length ? blogSnippetsJsx : <Spinner animation="border" variant="primary" /> }
      </Fragment>
    )
  }
}

export default BlogSnippets
