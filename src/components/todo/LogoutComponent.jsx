import React, { Component } from "react"
import { Link } from "react-router-dom"

class LogoutComponent extends Component {
    render() {
        console.log("LogoutComponent")
        return (
            <>
                <h1>
                    <div className="container">You are logged out</div>
                </h1>
                <h5>
                    <Link to="/login">Click here</Link> to login again!
                </h5>
            </>
        )
    }
}

export default LogoutComponent