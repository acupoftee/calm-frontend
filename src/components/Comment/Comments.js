import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Comment from './Comment'

// import ListGroup from 'react-bootstrap/ListGroup'
// import Card from 'react-bootstrap/Card'
// import Spinner from 'react-bootstrap/Spinner'

class Comments extends Component {
  state = {
    comments: this.props.blog.comments,
    deleted: false
  }

  async componentDidMount () {
    try {
      const commentObjs = []
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
      console.error(error)
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
      console.log(error)
      this.props.alert({
        heading: 'Error',
        message: 'There was a problem deleting this.',
        variant: 'danger'
      })
    }
  }

  render () {
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
      <Fragment>
        <h3>Comments</h3>
        { this.state.comments.length ? commentsJsx : 'No comments yet :C' }
      </Fragment>
    )
  }
}

export default Comments
