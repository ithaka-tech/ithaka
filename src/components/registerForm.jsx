import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as clientService from "../services/clientService";
import "../registerForm.css";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "", confirmPassword: "" },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  };

  doSubmit = async () => {
    const { navigate } = this.props;
    console.log("Submitted:", this.state.data);
    try {
      await clientService.register(this.state.data);
      navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.errors };
        error.email = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="form-register-container bg-light"
          style={{ height: "100vh" }}
        >
          <div className=" form-register col-md-7 col-lg-8 my-5">
            <h4 className="mb-3">Register</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="row g-3">
                {this.renderInput("name", "Full Name", "col-12")}
                {this.renderInput(
                  "email",
                  "Email",
                  "col-12",
                  "you@example.com",
                  "email"
                )}
                {this.renderInput(
                  "password",
                  "Password",
                  "col-6",
                  "",
                  "password"
                )}
                {this.renderInput(
                  "confirmPassword",
                  "Confirm Password",
                  "col-6",
                  "",
                  "password"
                )}
              </div>
              <hr className="my-4" />
              {this.renderButton(
                "Create Account",
                "col-12 btn btn-primary btn-lg"
              )}
              <div className="opacity-75 my-3">
                Already have an account?{" "}
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
