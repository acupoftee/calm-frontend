import React, { Component, Fragment } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Comments from '../Comment/Comments'

class Blog extends Component {
  state = {
    blog: null,
    loading: true,
    deleted: false
  }

  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/blogs/${this.props.match.params.id}`)
      this.setState({ blog: response.data.blog, loading: false })
    } catch (error) {
      console.error(error)
    }
  }

  delete = async () => {
    try {
      await axios.delete(`${apiUrl}/blogs/${this.props.match.params.id}`, {
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ deleted: true })
      this.props.alert({
        heading: 'Success!!!!',
        message: 'You deleted a blog.',
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
    const { blog, loading, deleted } = this.state
    let buttonGroupJsx
    if (deleted) {
      return <Redirect to={
        {
          pathname: `/authors/${blog.owner}`,
          state: {
            msg: 'Blog successfully deleted'
          }
        }
      }/>
    }
    if (!loading) {
      buttonGroupJsx = (
        <Fragment>
          <Button href={`#/blogs/${blog._id}/edit`}>Edit Blog</Button>
          <span>&nbsp;</span>
          <Button variant="danger" onClick={this.delete}>Delete Blog</Button>
        </Fragment>
      )
    }
    return (
      <div>
        { blog && (
          <Fragment>
            <h1>{blog.title}</h1>
            <Link to={`/authors/${blog.owner}`}>
              <small className="blog-author-full">{blog.author}</small>
            </Link>
            <p>{blog.text}</p>
            {(this.props.user && blog) && (this.props.user._id === blog.owner)
              ? buttonGroupJsx
              : ''}
            <Comments blogId={blog._id.toString()} user={this.props.user} alert={this.props.alert}/>
          </Fragment>
        )
        }
      </div>
    )
  }
}

export default withRouter(Blog)
