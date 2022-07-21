import React from "react";
import { Link } from "react-router-dom";

const AddCustomerMethod = (props) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh" }}
    >
      <div className="card m-3" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">Manual</h5>
          <p className="card-text">Fill out customer credentials manually.</p>
          <Link to="/home/customers/new" className="btn btn-primary">
            Select
          </Link>
        </div>
      </div>
      <div className="card m-3" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">Automatic</h5>
          <p className="card-text">Send an email to customer.</p>
          <Link to="/home/customers/sendemail" className="btn btn-primary">
            Select
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerMethod;
