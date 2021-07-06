import "./index.css";
import { Link } from "react-router-dom";

import { Component } from "react";

export class NavOpen extends Component {
  render() {
    return (
      <div className="Nav_OPEN">
        <div className="navMenu">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <p className="navMenuText">Home</p>
          </Link>
          <p className="navMenuText" style={{ textDecoration: "none" }}>
            About
          </p>
        </div>
        <Link to="/login">
          <button className="navButton" style={{ textDecoration: "none" }}>
            Get Started
          </button>
        </Link>
      </div>
    );
  }
}

export default NavOpen;
