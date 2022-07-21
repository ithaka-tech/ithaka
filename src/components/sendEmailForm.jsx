import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./common/form";
import "../sendEmailForm.css";

class SendEmailForm extends Form {
  state = { data: { email: "" }, errors: {} };

  schema = {
    email: Joi.string().email().required().label("Email"),
  };

  doSubmit = () => {
    const { navigate } = this.props;
    const { data: email } = this.state;
    console.log(email);
    navigate("/home/customers");
  };

  render() {
    return (
      <div
        className="form-email-container bg-light"
        style={{ height: "100vh" }}
      >
        <div className="form-email">
          <h4 className="mb-3">Enter Customer's Email</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="row g-3">
              {this.renderInput(
                "email",
                "Email",
                "col-12",
                "someone@example.com",
                "email"
              )}
            </div>
            <Link to="/home/customers" className="w-45 btn btn-secondary my-3">
              Cancel
            </Link>
            {this.renderButton("Send", "w-45 btn btn-primary ms-2")}
          </form>
        </div>
      </div>
    );
  }
}

export default SendEmailForm;
