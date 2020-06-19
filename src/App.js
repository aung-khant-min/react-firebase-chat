import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { auth } from './services/firebase'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile';
import ChangeName from './pages/ChangeName'
import AddContact from './pages/AddContact'
import ChatRoom from './pages/ChatRoom'
import CircularProgress from '@material-ui/core/CircularProgress'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => authenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
  />
)

const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => authenticated === false
      ? <Component {...props} />
      : <Redirect to='/chat' />
    }
  />
)



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    }
  }

  componentDidMount() {

    auth().onAuthStateChanged(user => {
      user ? this.setState({
        authenticated: true,
        loading: false,
      })
        : this.setState({
          authenticated: false,
          loading: false,
        })
    })

  }

  render() {
    return this.state.loading ? <CircularProgress className="load"/>
      : (
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Home} authenticated={this.state.authenticated}></PublicRoute>
            <PrivateRoute path="/chat" component={Chat} authenticated={this.state.authenticated}></PrivateRoute>
            <PublicRoute path="/signup" component={Signup} authenticated={this.state.authenticated}></PublicRoute>
            <PublicRoute path="/login" component={Login} authenticated={this.state.authenticated}></PublicRoute>
            <PrivateRoute path="/profile" component={Profile} authenticated={this.state.authenticated}></PrivateRoute>
            <PrivateRoute path="/username change" component={ChangeName} authenticated={this.state.authenticated}></PrivateRoute>
           <PrivateRoute path="/add contact" component={AddContact} authenticated={this.state.authenticated}></PrivateRoute>
           <PrivateRoute path="/:id" component={ChatRoom} authenticated={this.state.authenticated}></PrivateRoute>
          </Switch>
        </Router>
      )
  }

}


