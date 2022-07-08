import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = { data: { client: "", email: "", password: "" }, errors: {} };

  schema = {
    _id: Joi.string(),
    client: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center bg-light">
          <div className="col-md-7 col-lg-8 my-5">
            <h4 className="mb-3">Register</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="row g-3">
                {this.renderInput("client", "Full Name", "col-12")}
                {this.renderInput(
                  "email",
                  "Email",
                  "col-6",
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
              </div>
              <hr className="my-4" />
              <Link
                to="/home/customers"
                className="w-45 btn btn-secondary btn-lg m-1"
              >
                Cancel
              </Link>
              {this.renderButton("Save", "w-45 btn btn-primary btn-lg m-1")}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
