import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent.jsx';
import TodosComponent from './TodosComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import './TodoApp.css'
import UnauthenticatedRoute from './UnauthenticatedRoute.jsx';
import TodoComponent from './TodoComponent.jsx';
import RegisterComponent from './RegisterComponent.jsx';

class TodoApp extends Component {
    render() {
        console.log("TodoApp")
        return (
            <div className="TodoApp">

                <Router>
                    <>
                        <Route component={HeaderComponent} />
                        <Switch>
                            <UnauthenticatedRoute path="/" exact component={LoginComponent} />
                            <UnauthenticatedRoute path="/login" component={LoginComponent} />
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                            <AuthenticatedRoute path="/todos" component={TodosComponent} />
                            <UnauthenticatedRoute path="/logout" component={LogoutComponent} />
                            <UnauthenticatedRoute path="/register" component={RegisterComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                        <Route component={FooterComponent} />
                    </>
                </Router>
                
            </div>
        );
    }
}

function ErrorComponent() {
    return <div>Invalid URL. Please verify the URL entered!</div>
}

export default TodoApp;