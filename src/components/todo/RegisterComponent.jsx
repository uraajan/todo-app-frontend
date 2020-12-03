import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../api/todo/AuthenticationService";

class RegisterComponent extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            repeatPassword: "",
            registerSuccessful: false,
            registerFailure: false
        }

        // Ensure to bind all methods in the class 
        this.handleTextElementChange = this.handleTextElementChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.register = this.register.bind(this);
    }

    // Ensure that the name used in form element and state are exactly the same
    handleTextElementChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

        if (this.state.password !== this.state.repeatPassword) {
            
        }
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.register()
        }
    }

    register() {
        AuthenticationService.executeJwtRegisterService(this.state.username, this.state.password)
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
                        registerSuccessful: false,
                        registerFailure: true
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
                    <input type="password" name="repeatPassword" value={this.state.repeatPassword} onChange={this.handleTextElementChange} onKeyDown={this.handleKeyDown} placeholder="Repeat Password" />
                    <br />
                    <br />
                    <div>
                        <button className="btn btn-success" onClick={this.register}>Sign Up</button>
                    </div>
                </div>
            </>
        );
    }
}

export default RegisterComponent