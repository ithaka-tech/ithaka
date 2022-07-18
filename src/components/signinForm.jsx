import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./common/form";
import auth from "../services/authService";
import logo from "../assets/ithaka-wp.png";
import "../signinForm.css";

class SigninForm extends Form {
  state = { data: { email: "", password: "" }, errors: {} };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const { navigate } = this.props;
    try {
      const { data } = this.state;
      await auth.signin(data.email, data.password);

      navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState(errors);
      }
    }
  };

  render() {
    return (
      <div className="form-signin-container bg-light">
        <main className="form-signin w-100 m-auto">
          <form onSubmit={this.handleSubmit} className="justify-content-center">
            <img className="mb-4 rounded" src={logo} alt="logo" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            {this.renderSignin(
              "email",
              "floatingInput",
              "Email address",
              "name@example.com",
              "email"
            )}
            {this.renderSignin(
              "password",
              "floatingPassword",
              "Password",
              "Password",
              "password"
            )}
            {this.renderButton("Sign in", "w-100 btn btn-lg btn-primary")}
            <div className="opacity-75 my-3">
              Don't have an account?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register now
              </Link>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default SigninForm;
