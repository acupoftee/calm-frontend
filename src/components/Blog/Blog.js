import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Blog extends Component {
  state = {
    blog: null
  }

  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/blogs/${this.props.match.params.id}`)
      this.setState({ blog: response.data.blog })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { blog } = this.state

    return (
      <div>
        { blog && (
          <Fragment>
            <h1>{blog.title}</h1>
            <i>{blog.author}</i>
            <p>{blog.text}</p>
            {(this.props.user && blog) && (this.props.user._id === blog.owner)
              ? <Button href={`#/blogs/${blog.title}/edit`}>Edit Blog</Button>
              : ''}
          </Fragment>
        )
        }
      </div>
    )
  }
}

export default withRouter(Blog)
