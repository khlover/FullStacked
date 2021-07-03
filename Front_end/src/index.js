import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router history={useHistory}>
    <App />
  </Router>,
  document.getElementById("root")
);
