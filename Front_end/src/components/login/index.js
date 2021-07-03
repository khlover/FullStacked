import { Component } from "react";
import { logincall } from "../../API/logincall";
import { Redirect } from "react-router-dom";
import "./index.css";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      authkey: "",
      message: "Sign In",
      color: "",
      redirect: false,
    };
    this.validate = this.validate.bind(this);
    this.login = this.login.bind(this);
  }

  validate = (param) => (event) => {
    this.setState({ [param]: event.target.value });
  };

  login() {
    if (this.state.email === "" || this.state.password === "") {
      this.setState({ message: "Please enter a email and password" });
      this.setState({ color: "red" });
    } else {
      logincall(this.state.email, this.state.password).then((data) => {
        if (Object.keys(data).length > 2) {
          this.setState({ authkey: data });
          this.setState({ redirect: true });
        }
      });
    }
  }

  render() {
    if (this.state.redirect) {
      this.props.onKeyChange(this.state.authkey);
      return <Redirect push to="/mystack" />;
    }
    return (
      <div>
        <div className="loginContainer">
          <p className="navTitle" id={this.state.color}>
            {this.state.message}
          </p>

          <label>
            Email
            <br />
            <input
              type="text"
              value={this.state.email}
              onChange={this.validate("email")}
            />
          </label>
          <br />
          <label>
            Password
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.validate("password")}
            />
          </label>
          <button className="navButtonL" onClick={this.login.bind(this)}>
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
