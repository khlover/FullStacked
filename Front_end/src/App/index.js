import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";
import MyStack from "../components/stories";
import Login from "../components/login";
import Home from "../components/home";
import NavOpen from "../components/nav_open";
import NavAuth from "../components/nav_open_auth";
import StackController from "../components/story_controller";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authkey: localStorage.getItem("authkey"),
      auth:
        localStorage.getItem("auth") === null
          ? false
          : localStorage.getItem("auth"),
    };

    this.updatekey = this.updatekey.bind(this);
    this.getCurrentStory = this.getCurrentStory.bind(this);
  }

  updatekey = (value) => {
    localStorage.setItem("authkey", value);
    localStorage.setItem("auth", !this.state.auth);
    this.setState({ auth: !this.state.auth, authkey: value });
  };

  getCurrentStory = (story) => {
    console.log(story);
    this.setState({
      currentStory: story,
    });
  };
  render() {
    return (
      <main>
        <Header auth={this.state.auth} updatekey={this.updatekey} />

        <Switch>
          <Route
            path="/"
            component={() => (this.props.auth ? <Home /> : <MyStack />)}
            exact
          />
          <Route
            path="/login"
            component={() => <Login onKeyChange={this.updatekey} />}
          />
          <Route
            path="/mystack"
            component={() => (
              <MyStack
                authkey={this.state.authkey}
                getCurrentStory={this.getCurrentStory}
                home={false}
              />
            )}
          />

          <Route
            path="/home"
            component={() => (
              <MyStack
                authkey={this.state.authkey}
                getCurrentStory={this.getCurrentStory}
                home={true}
              />
            )}
          />

          <Route
            path="/nav"
            component={() =>
              this.state.auth ? (
                <NavAuth updatekey={this.updatekey} />
              ) : (
                <NavOpen />
              )
            }
          />
          <Route
            path="/addstack"
            component={() => (
              <StackController edit={false} authkey={this.state.authkey} />
            )}
          />
          <Route
            path="/edit"
            component={() => (
              <StackController
                edit={true}
                authkey={this.state.authkey}
                currentStory={this.state.currentStory}
              />
            )}
          />
          <Route
            path="/editstack"
            component={() => <StackController edit={false} />}
          />

          <Route component={Error} />
        </Switch>
        <Footer />
      </main>
    );
  }
}

export default App;
