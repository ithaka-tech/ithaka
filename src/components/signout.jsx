import React, { Component } from "react";
import auth from "../services/authService";

class SignOut extends Component {
  componentDidMount() {
    auth.signout();
    // window.location = '/';
  }
  render() {
    return null;
  }
}

export default SignOut;
