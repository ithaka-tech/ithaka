import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCustomer, saveCustomer } from "../services/customerService";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class NewCustomerForm extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      paymentMode: "",
    },
    states: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    phoneNumber: Joi.string().label("Phone Number"),
    address: Joi.string().required().label("Address"),
    address2: Joi.string().allow(""),
    city: Joi.string().label("City"),
    state: Joi.string().label("State"),
    country: Joi.string().label("Country"),
    zip: Joi.string().label("Zip"),
    paymentMode: Joi.string().required(),
  };

  async populateCustomer() {
    try {
      const customerId = this.props.params.id;
      if (customerId === "new") return;
      const sessionId = auth.getJwt();
      const response = await getCustomer(sessionId, customerId);
      const customer = response.data.customer;
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("not-found");
    }
  }

  componentDidMount() {
    this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
      address2: customer.address2,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      zip: customer.zip,
      paymentMode: customer.paymentMode,
    };
  }

  doSubmit = async () => {
    const { navigate } = this.props;
    const { data: customer } = this.state;
    const sessionId = auth.getJwt();
    await saveCustomer(sessionId, customer);
    navigate("/home/customers");
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center bg-light">
          <div className="col-md-7 col-lg-8 my-5">
            <h4 className="mb-3">Customer Form</h4>
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
                  "phoneNumber",
                  "Phone Number",
                  "col-6",
                  "(888) 888-8888"
                )}
                {this.renderInput(
                  "address",
                  "Address",
                  "col-12",
                  "1234 Main St"
                )}
                {this.renderInput(
                  "address2",
                  "Address 2 (Optional)",
                  "col-12",
                  "Apartment or suite"
                )}
                {this.renderInput("city", "City", "col-12", "")}
                {this.renderSelect(
                  "state",
                  "State",
                  [
                    { _id: "PA", name: "Pennsylvania" },
                    { _id: "FL", name: "Florida" },
                  ],
                  "col-md-4",
                  "Choose..."
                )}
                {this.renderSelect(
                  "country",
                  "Country",
                  [
                    { _id: "United States", name: "United States" },
                    { _id: "Vietnam", name: "Vietnam" },
                  ],
                  "col-md-5",
                  "Choose..."
                )}
                {this.renderInput("zip", "Zip", "col-md-3")}

                <hr className="my-4" />

                <h4 className="mb-3">Payment Type</h4>

                {this.renderRadio(
                  "paymentMode",
                  [
                    { _id: "Cash on Delivery", label: "Cash on Delivery" },
                    { _id: "Bank Transfer", label: "Bank Transfer" },
                  ],
                  "my-3"
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

export default withParams(NewCustomerForm);
