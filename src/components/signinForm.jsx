import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./common/form";
import "../signinForm.css";

class SigninForm extends Form {
  state = { data: { email: "", password: "" }, errors: {} };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  render() {
    console.log(this.state.errors);
    return (
      <main className="form-signin w-100 m-auto">
        <form onSubmit={this.handleSubmit}>
          <img
            className="mb-4"
            src="/docs/{{< param docs_version >}}/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
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
    );
  }
}

export default SigninForm;
