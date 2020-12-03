import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../api/todo/AuthenticationService";

class LoginComponent extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            loginSuccessful: false,
            loginFailure: false
        }

        // Ensure to bind all methods in the class 
        this.handleTextElementChange = this.handleTextElementChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.login = this.login.bind(this);
    }

    // Ensure that the name used in form element and state are exactly the same
    handleTextElementChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.login()
        }
    }

    login() {
        // if (this.state.username === 'uraajan' && this.state.password === 'test') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // } else {
        //     this.setState(
        //         {
        //             loginSuccessful: false,
        //             loginFailure: true
        //         }
        //     )
        // }

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`)
            })
            .catch((error) => {
                if (error.message) {
                    console.log(error.message)    
                } else if (error.response && error.response.data) {
                    console.log(error.response.data.message)
                }
                
                this.setState(
                    {
                        loginSuccessful: false,
                        loginFailure: true
                    }
                )
            })
    }

    render() {
        console.log("LoginComponent")
        return (
            <>
                <h1>Login</h1>
                <div className="container">
                    {this.state.loginFailure && <div className="alert alert-warning">Invalid credentials</div>}
                    <input type="text" name="username" value={this.state.username} onChange={this.handleTextElementChange} onKeyDown={this.handleKeyDown} placeholder="Username" />
                    <br />
                    <br />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleTextElementChange} onKeyDown={this.handleKeyDown} placeholder="Password" />
                    <br />
                    <br />
                    <div>
                        <button className="btn btn-success" onClick={this.login}>Login</button>
                    </div>

                    <br />
                    <br />
                    <div>
                        Not a registered user yet? <Link to="/register">Click here</Link> to register
                    </div>
                </div>
            </>
        );
    }
}

export default LoginComponent