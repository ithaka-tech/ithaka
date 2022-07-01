import React, { Component } from "react";
import Table from "./common/table";

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
          <button
            onClick={() => this.props.onEdit(customer)}
            className="btn btn-secondary btn-sm mx-1"
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            onClick={() => this.props.onDelete(customer)}
            className="btn btn-danger btn-sm m-1"
          >
            <i className="bi bi-trash3"></i>
          </button>
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
