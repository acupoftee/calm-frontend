import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import BlogSnippets from '../Blog/BlogSnippets'
import Blog from '../Blog/Blog'
import UpdateBlog from '../Blog/UpdateBlog'
import CreateBlog from '../Blog/CreateBlog'

// import Comments from '../Comment/Comments'
import Author from '../Author/Author'
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      darkMode: false
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  dark = darkMode => {
    this.setState({ darkMode: !darkMode })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} theme={this.dark}/>
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} theme={this.dark} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} theme={this.dark}/>
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} theme={this.dark} />
          )} />
          <Route exact path='/' render={() => (
            <BlogSnippets
              alert={this.alert}
              theme={this.dark}
            />
          )} />
          <Route exact path='/blogs/:id'
            user={user}
            render={() => (
              <Blog
                user={user}
                alert={this.alert}
                theme={this.dark}
              />
            )}/>
          <Route exact path='/authors/:id'
            render={() => (
              <Author user={user} alert={this.alert} theme={this.dark}/>
            )}/>
          <AuthenticatedRoute
            user={user}
            path='/blogs/:id/edit'
            render={() => (
              <UpdateBlog
                user={user}
                alert={this.alert}
                theme={this.dark}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/createblog'
            render={() => (
              <CreateBlog
                user={user}
                alert={this.alert}
                theme={this.dark}
              />
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
