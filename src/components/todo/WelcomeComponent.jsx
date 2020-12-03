import React, { Component } from "react"
import { Link } from "react-router-dom"
import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends Component {

    constructor() {
        super();

        this.state = {
            welcomeMessage: ''
        }

        this.makeBackendCall = this.makeBackendCall.bind(this)
        this.handleSuccessResponse = this.handleSuccessResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        console.log("WelcomeComponent")
        return (
            <>
                <h1>Welcome {this.props.match.params.name}!</h1>
                <div className="container">
                    Click here to view the <Link to="/todos">ToDo</Link> list
                </div>
                <div className="container">
                    Click here to make a backend call 
                    <button className="btn btn-success" onClick={this.makeBackendCall}>
                        Click
                    </button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>    
        )
    }

    makeBackendCall() {
        HelloWorldService.executePathVariable(this.props.match.params.name, 1)
            .then( response => this.handleSuccessResponse(response) )
            .catch( error => this.handleError(error) )
    }

    handleSuccessResponse(response) {
        console.log(response)
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error) {
        console.log(error.response)

        let errorMessage = ""
        if (error.message) {
            errorMessage += error.message
        }
        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({welcomeMessage: errorMessage})
    }
}

export default WelcomeComponent