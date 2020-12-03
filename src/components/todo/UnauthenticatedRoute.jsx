import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../../api/todo/AuthenticationService'

class UnauthenticatedRoute extends Component {
    render() {
        console.log("AuthenticatedRoute")
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/welcome/uraajan" />
        }
    }
}

export default UnauthenticatedRoute