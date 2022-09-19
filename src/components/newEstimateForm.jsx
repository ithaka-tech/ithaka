import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCustomers } from "../services/customerService";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class NewEstimateForm extends Form {
  state = {
    data: {
      estimateName: "",
      customer: "",
      estimateDivision: "",
      estimateType: "",
      schedule: "",
      estimatePhase: "",
    },
    customers: [],
    states: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    estimateName: Joi.string().required().label("Estimate Name"),
    customer: Joi.string().required().label("customer"),
    estimateDivision: Joi.string().label("Estimate Division"),
    estimateType: Joi.string().required().label("Estimate Type"),
    schedule: Joi.string().required().label("Schedule"),
    estimatePhase: Joi.string().required().label("EstimatePhase"),
  };

  async populateCustomers() {
    try {
      const sessionId = auth.getJwt();
      const response = await getCustomers(sessionId);
      const customers = response.data.customer;
      this.setState({ customers });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("not-found");
    }
  }

  populateData() {
    const { data } = this.props;
    console.log(data);
    this.setState({ data });
  }

  componentDidMount() {
    this.populateCustomers();
    this.populateData();
  }

  doSubmit = async () => {
    const { data: dataOne } = this.state;
    const { onPageChange, onSave } = this.props;
    onSave(dataOne);
    onPageChange("2");
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center bg-light">
          <div className="col-md-7 col-lg-8 my-5">
            <h4 className="mb-3">Estimate Form</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="row g-3">
                {this.renderInput("estimateName", "Estimate Name", "col-12")}
                {this.renderInput("customer", "Customer", "col-6")}
                {this.renderInput(
                  "estimateDivision",
                  "Estimate Division",
                  "col-6"
                )}
                {this.renderInput("estimateType", "Estimate Type", "col-12")}
                {this.renderInput("schedule", "Schedule", "col-12")}
                {this.renderInput("estimatePhase", "Estimate Phase", "col-12")}
              </div>
              <hr className="my-4" />
              <Link
                to="/home/estimates"
                className="w-45 btn btn-secondary btn-lg m-1"
              >
                Cancel
              </Link>
              {this.renderButton("Next", "w-45 btn btn-primary btn-lg m-1")}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withParams(NewEstimateForm);
