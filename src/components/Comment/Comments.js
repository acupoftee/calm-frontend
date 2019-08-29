import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Comment from './Comment'
import CommentForm from './CommentForm'

class Comments extends Component {
  state = {
    comments: [],
    deleted: false,
    added: false,
    isLoading: true,
    comment: {
      text: '',
      author: this.props.user ? this.props.user.displayName : '',
      blog: this.props.blogId
    }
  }

  async componentDidMount () {
    await this.getComments()
  }

  getComments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/comments`)
      const comments = response.data.comments.filter(comment => (
        comment.blog === this.props.blogId
      ))
      this.setState({ comments: comments, isLoading: false })
    } catch (error) {
      console.error(error)
      this.props.alert({
        heading: 'Error',
        message: 'There was a problem loading comments.',
        variant: 'danger'
      })
    }
  }

  delete = async commentId => {
    try {
      await axios.delete(`${apiUrl}/comments/${commentId}`, {
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.props.alert({
        heading: 'Success!!!!',
        message: 'You deleted a comment.',
        variant: 'success'
      })
      this.setState({ deleted: true })
      await this.getComments()
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
      const response = await axios({
        method: 'POST',
        url: `${apiUrl}/comments`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          comment: this.state.comment
        }
      })
      console.log('handleSubmit response', response.data)
      this.setState({ added: true, comments: [response.data, ...this.state.comments], comment: { ...this.state.comment, text: '' } })
      this.props.alert({
        heading: 'Success!!!!',
        message: 'You added a comment.',
        variant: 'success'
      })
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
    // console.log(this.state.comments[0].author)
    // const commentsJsx = this.state.comments.map((comment, i) => (
    //   <Comment
    //     comment={comment}
    //     user={this.props.user}
    //     handleDelete={this.delete}
    //     key={i}
    //   />
    // ))
    // if (this.state.loading) {
    //   return (
    //     <Spinner animation="border" variant="primary" />
    //   )
    // }
    let commentsJsx
    if (!this.state.isLoading) {
      commentsJsx = this.state.comments.map((comment, i) => (
        <Comment
          comment={comment}
          user={this.props.user}
          handleDelete={this.delete}
          key={i}
        />
      ))
    }
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
