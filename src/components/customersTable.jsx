import React, { Component } from "react";
import Table from "./common/table";
import DeleteConfirmation from "./deleteConfirmation";
import { Link } from "react-router-dom";

class CustomersTable extends Component {
  columns = [
    { path: "trackingId", label: "Tracking ID" },
    { path: "customer", label: "Customer" },
    { path: "email", label: "Email" },
    { path: "address", label: "Address" },
    { path: "phoneNumber", label: "Phone Number" },
    { path: "paymentMode", label: "Payment Mode" },
    { path: "status", label: "Status" },
    {
      key: "action",
      content: (customer) => (
        <React.Fragment>
          <Link
            to={`../customers/${customer._id}`}
            className="btn btn-secondary btn-sm mx-1"
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
          <DeleteConfirmation
            data={customer}
            dataName={customer.customer}
            className="btn btn-danger btn-sm m-1"
            onDelete={this.props.onDelete}
          />
        </React.Fragment>
      ),
    },
  ];

  render() {
    const { customers, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
