import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as clientService from "../services/clientService";

class RegisterForm extends Form {
  state = { data: { name: "", email: "", password: "" }, errors: {} };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const { navigate } = this.props;
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
        <div className="d-flex justify-content-center bg-light">
          <div className="col-md-7 col-lg-8 my-5">
            <h4 className="mb-3">Register</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="row g-3">
                {this.renderInput("name", "Full Name", "col-12")}
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
              <Link to="/signin" className="w-45 btn btn-secondary btn-lg m-1">
                Cancel
              </Link>
              {this.renderButton(
                "Create Account",
                "w-45 btn btn-primary btn-lg m-1"
              )}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
