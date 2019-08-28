import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import BlogForm from './BlogForm'

class CreateBlog extends Component {
  state = {
    blog: {
      title: '',
      author: this.props.user.displayName,
      text: ''
    }
  }

  handleChange = event => {
    this.setState({ blog: { ...this.state.blog, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/blogs`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        blog: this.state.blog
      }
    })
      .then(response => {
        this.props.alert({
          heading: 'Success!!!!',
          message: 'You created a blog.',
          variant: 'success'
        })
        this.props.history.push(`/blogs/${response.data.blog._id}`)
      })
      .catch(console.error)
  }

  render () {
    return (
      <BlogForm
        blog={this.state.blog}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(CreateBlog)
