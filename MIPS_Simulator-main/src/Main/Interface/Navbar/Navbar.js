import React from "react";
import "./Navbar.css";

class Navbar extends React.Component {
    render() {
        return (
            <nav className="main-nav">
                <div></div>

                <span id="navbar-right-id">
                    <span className="navbar-buttons-right">
                        <button
                            style={{ borderLeft: `1px solid grey` }}
                            onClick={this.props.step}
                        >
                            STEP
                        </button>
                        <button
                            style={{ borderLeft: `1px solid grey` }}
                            onClick={this.props.run}
                        >
                            RUN
                        </button>
                    </span>
                </span>
            </nav>
        );
    }
}
export default Navbar;
