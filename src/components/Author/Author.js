import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
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
      this.props.alert({
        heading: 'Error',
        message: 'There was a problem loading this author.',
        variant: 'danger'
      })
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
            <h1>{author.displayName}</h1>
            {(this.props.user) && (this.props.user._id === author._id)
              ? <Link to={'/createblog'}>
                <p>Create Blog</p>
              </Link>
              : ''}
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
