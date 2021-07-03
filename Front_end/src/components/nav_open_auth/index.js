import "./index.css";
import { Component } from "react";

export class NavAuth extends Component {
  render() {
    return (
      <div>
        <div className="navMenu">
          <p className="navMenuText">Home</p>
          <p className="navMenuText">Add a Post</p>
          <p className="navMenuText">My stack</p>
        </div>

        <button className="navButton">Logout</button>
      </div>
    );
  }
}

export default NavAuth;
