import React, { Component } from "react"

class FooterComponent extends Component {
    render() {
        console.log("FooterComponent")
        return (
            <footer className="footer">
                <span className="text-muted">
                    &copy; Powered by uraajan @ 2020. All rights reserved.
                </span>
            </footer>
        )
    }
}

export default FooterComponent