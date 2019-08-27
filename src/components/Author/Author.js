import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BlogSnippet from '../Blog/BlogSnippet'

class Author extends Component {
  state = {
    author: null,
    blogs: []
  }

  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/users/${this.props.match.params.id}`)
      const blogs = await axios(`${apiUrl}/blogs`)
      this.setState({ author: response.data.user, blogs: blogs.data.blogs })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { author, blogs } = this.state
    const blogSnippetsJsx = blogs.filter(blog => blog.owner === author._id)
      .map(blog => (
        <BlogSnippet key={blog._id} blog={blog} />
      ))
    return (
      <div>
        { author && (
          <Fragment>
            <img src={author.avatarUrl} height="50"/>
            <h1>{author.displayName}</h1>
            <div>
              {blogSnippetsJsx}
            </div>
          </Fragment>
        )
        }
      </div>
    )
  }
}

export default withRouter(Author)
