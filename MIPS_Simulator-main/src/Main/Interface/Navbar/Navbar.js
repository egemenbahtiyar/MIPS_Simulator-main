import React from "react";
import "./Navbar.css";

// navbar component (main)

class Navbar extends React.Component {
    /* empty functions for testing click events */

    render() {
        return (
            <nav className="main-nav">
                <div></div>

                {/* step-run and run buttons */}
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
