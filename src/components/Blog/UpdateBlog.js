import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import BlogForm from './BlogForm'

class UpdateBlog extends Component {
  state = {
    blog: null
  }

  componentDidMount () {
    axios(`${apiUrl}/blogs/${this.props.match.params.id}`)
      .then(response => this.setState({ blog: response.data.blog }))
      .catch(() => this.props.alert({
        heading: 'Error',
        message: 'Something went wrong',
        variant: 'danger'
      }))
  }
  handleChange = event => {
    this.setState({ blog: { ...this.state.blog, [event.target.name]: event.target.value } })
  }

  handleSubmit = event => {
    console.log(this.props.user.token)
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/blogs/${this.state.blog._id}`,
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
          message: 'You updated a blog.',
          variant: 'success'
        })
        console.log(response)
        this.props.history.push(`/blogs/${this.state.blog._id}`)
      })
      .catch(console.error)
  }

  render () {
    if (!this.state.blog) {
      return (
        <h1>Loading</h1>
      )
    }
    return (
      <BlogForm
        blog={this.state.blog}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(UpdateBlog)
