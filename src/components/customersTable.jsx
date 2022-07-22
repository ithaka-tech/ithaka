import React, { Component } from "react";
import Table from "./common/table";
import DeleteConfirmation from "./deleteConfirmation";
import { Link } from "react-router-dom";

class CustomersTable extends Component {
  columns = [
    // { path: "_id", label: "Tracking ID" },
    { path: "name", label: "Customer" },
    { path: "email", label: "Email" },
    { path: "address", label: "Address" },
    { path: "phoneNumber", label: "Phone Number" },
    { path: "paymentMode", label: "Payment Mode" },
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
            dataName={customer.name}
            className="btn btn-danger btn-sm m-1"
            onDelete={this.props.onDelete}
          />
        </React.Fragment>
      ),
    },
  ];

  render() {
    const { customers, sortColumn, onSort } = this.props;
    const adjustedCustomers = customers.map((c) => {
      let newAddress;
      if (!!c.address2.split(" ").join("")) {
        newAddress = `${c.address}, ${c.address2}, ${c.city}, ${c.state}, ${c.country}, ${c.zip}`;
        console.log("address2", c.address2);
      } else {
        newAddress = `${c.address}, ${c.city}, ${c.state}, ${c.country}, ${c.zip}`;
      }
      return { ...c, address: newAddress };
    });
    return (
      <Table
        columns={this.columns}
        data={adjustedCustomers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
