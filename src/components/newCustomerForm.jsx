import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCustomers, saveCustomer } from "../services/customerService";
import { getFakeCustomer } from "../services/fakeCustomerService";
import Joi from "joi-browser";
import Form from "./common/form";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class NewCustomerForm extends Form {
  state = {
    data: {
      customer: "",
      email: "",
      phoneNumber: "",
      address: "",
      address2: "",
      country: "",
      state: "",
      zip: "",
      paymentMode: "",
    },
    states: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    customer: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email"),
    phoneNumber: Joi.string().label("Phone Number"),
    address: Joi.string().required().label("Address"),
    address2: Joi.string().allow(""),
    country: Joi.string().label("Country"),
    state: Joi.string().label("State"),
    zip: Joi.string().label("Zip"),
    paymentMode: Joi.string().required(),
  };

  // async populateCustomer() {
  //   try {
  //     const customerId = this.props.match.params.id;
  //     if (customerId === "new") return;

  //     const { data: customer } = await getCustomer(sessionId, customerId);
  //     this.setState({ data: this.mapToViewModel(customer) });
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
  //       this.props.history.replace("/not-found");
  //   }
  // }

  populateCustomer() {
    const customerId = this.props.params.id;
    console.log("customer id: ", customerId);
    if (customerId === "new") return;

    const customer = getFakeCustomer(customerId);
    console.log("Customer being edited: ", customer);
    this.setState({ data: this.mapToViewModel(customer) });
  }

  componentDidMount() {
    this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      customer: customer.customer,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      address: "",
      address2: "",
      country: "",
      state: "",
      zip: "",
      paymentMode: customer.paymentMode,
    };
  }

  doSubmit = async () => {
    const { navigate } = this.props;
    const { data: customer } = this.state;
    console.log(customer);

    await saveCustomer(customer);
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
                {this.renderInput("customer", "Full Name", "col-12")}
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
                {this.renderSelect(
                  "country",
                  "Country",
                  [
                    { _id: "unitedStates", name: "United States" },
                    { _id: "vietnam", name: "Vietnam" },
                  ],
                  "col-md-5",
                  "Choose..."
                )}
                {this.renderSelect(
                  "state",
                  "State",
                  [
                    { _id: "pennsylvania", name: "Pennsylvania" },
                    { _id: "florida", name: "Florida" },
                  ],
                  "col-md-4",
                  "Choose..."
                )}
                {this.renderInput("zip", "Zip", "col-md-3")}

                <hr className="my-4" />

                <h4 className="mb-3">Payment Type</h4>

                {this.renderRadio(
                  "paymentMode",
                  [
                    { _id: "cash", label: "Cash on Delivery" },
                    { _id: "transfer", label: "Bank Transfer" },
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
