import "./index.css";
import { Link } from "react-router-dom";

import { Component } from "react";

export class NavOpen extends Component {
  render() {
    return (
      <div className="Nav_OPEN">
        <div className="navMenu">
          <Link to="/home">
            <p className="navMenuText">Home</p>
          </Link>
          <p className="navMenuText">About</p>
        </div>
        <Link to="/login">
          <button className="navButton">Get Started</button>
        </Link>
      </div>
    );
  }
}

export default NavOpen;
