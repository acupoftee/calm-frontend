import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Comment from './Comment'
import CommentForm from './CommentForm'

// import ListGroup from 'react-bootstrap/ListGroup'
// import Card from 'react-bootstrap/Card'
// import Spinner from 'react-bootstrap/Spinner'

class Comments extends Component {
  state = {
    comments: this.props.blog.comments,
    deleted: false,
    added: false,
    comment: {
      text: '',
      author: this.props.user ? this.props.user.displayName : '',
      blog: this.props.blog._id
    }
  }

  async componentDidMount () {
    try {
      const commentObjs = []
      console.log(this.props.blog._id)
      // await the comment response from the API call
      console.log('Current comments', this.state.comments)
      for (const id of this.state.comments) {
        const response = await axios(`${apiUrl}/comments/${id}`)
        console.log('response', response)
        commentObjs.push(response.data.comment)
      }
      // const response = await axios(`${apiUrl}/comments/`)
      // add the comments to the comments state prop
      this.setState({ comments: commentObjs, isLoading: false })
      console.log('comments', this.state.comments)
    } catch (error) {
      // TODO: no console errors
      this.setState({ comments: [], isLoading: false })
    }
  }

  delete = async commentId => {
    try {
      await axios.delete(`${apiUrl}/comments/${commentId}`, {
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ deleted: true })
      this.props.alert({
        heading: 'Success!!!!',
        message: 'You deleted a comment.',
        variant: 'success'
      })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'There was a problem deleting this.',
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    this.setState({ comment: { ...this.state.comment, [event.target.name]: event.target.value } })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios({
        method: 'POST',
        url: `${apiUrl}/comments`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          comment: this.state.comment
        }
      })
      this.setState({ added: true })
      this.props.alert({
        heading: 'Success!!!!',
        message: 'You added a comment.',
        variant: 'success'
      })
      // this.props.history.push(`/blogs/${this.props.blog._id}`)
    } catch (error) {
      console.log(error)
      this.props.alert({
        heading: 'Error',
        message: 'There was a problem adding your comment.',
        variant: 'danger'
      })
    }
  }

  render () {
    // const { deleted, added } = this.state
    const commentsJsx = this.state.comments.map((comment, i) => (
      <Comment
        comment={comment}
        user={this.props.user}
        handleDelete={this.delete}
        key={i}
      />
    ))
    // if (this.state.loading) {
    //   return (
    //     <Spinner animation="border" variant="primary" />
    //   )
    // }

    return (
      <div className='comment-section'>
        <h3>Comments</h3>
        { this.props.user
          ? <CommentForm
            comment={this.state.comment}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          : ''}
        { this.state.comments.length ? commentsJsx : 'No comments yet :C' }
      </div>
    )
  }
}

export default Comments
