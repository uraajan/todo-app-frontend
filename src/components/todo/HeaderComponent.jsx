import React, { Component } from "react"
import { Link } from "react-router-dom"
import AuthenticationService from "../../api/todo/AuthenticationService"

class HeaderComponent extends Component {

    render() {
        console.log("HeaderComponent")
        let userLoggedIn = AuthenticationService.isUserLoggedIn()
        
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/welcome/uraajan" className="navbar-brand">uraajan</a></div>
                    <ul className="navbar-nav">
                        {userLoggedIn && <li><Link className="nav-link" to="/welcome/uraajan">Home</Link></li>}
                        {userLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!userLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {userLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
                
            </header>
        )
    }
}

export default HeaderComponent