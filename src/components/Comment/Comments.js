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
    comments: this.props.blog.comments
  }

  async componentDidMount () {
    try {
      const commentObjs = []
      // await the comment response from the API call
      for (const id of this.state.comments) {
        console.log('in case i did this right', id)
        const response = await axios(`${apiUrl}/comments/${id}`)
        commentObjs.push(response.data.comment)
      }
      // const response = await axios(`${apiUrl}/comments/`)
      // add the comments to the comments state prop
      this.setState({ comments: commentObjs, isLoading: false })
    } catch (error) {
      // TODO: no console errors
      console.error(error)
    }
  }

  render () {
    const commentsJsx = this.state.comments.map((comment, i) => (
      <Comment comment={comment} key={i}/>
    ))
    // if (this.state.loading) {
    //   return (
    //     <Spinner animation="border" variant="primary" />
    //   )
    // }

    return (
      <Fragment>
        <h3>Comments</h3>
        {commentsJsx || 'No comments yet :C'}
      </Fragment>
    )
  }
}

export default Comments
