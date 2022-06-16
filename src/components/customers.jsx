import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import CustomersTable from "./customersTable";
import "../customers.css";

const apiEndpoint = "";

class Customers extends Component {
  state = {
    customers: [
      {
        _id: "10923847",
        trackingId: "RH490042245CN",
        customer: "Joe Smith",
        email: "potomy4tofedotov@nbobd.com",
        address: "35 Elmwood Street Evans GA 30809",
        phoneNumber: "907-200-3112",
        paymentMode: "Credit",
        status: "Test",
        action: "Edit Delete",
      },
      {
        _id: "13241234",
        trackingId: "RH490042245CN",
        customer: "Mary Smith",
        email: "avacadoland@nbobd.com",
        address: "78 Elmo Street Evans GA 30809",
        phoneNumber: "907-344-3112",
        paymentMode: "Cash",
        status: "Test",
        action: "Edit Delete",
      },
      {
        _id: "54232345",
        trackingId: "RH490042245CN",
        customer: "Will Smith",
        email: "getsmackedintheface@nbobd.com",
        address: "22 Bob Street Evans GA 30809",
        phoneNumber: "907-222-3112",
        paymentMode: "Check",
        status: "Test",
        action: "Edit Delete",
      },
    ],
    sortColumn: { path: "customer", order: "asc" },
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = (customer) => {
    const customers = this.state.customers.filter(
      (c) => c._id !== customer._id
    );
    this.setState({ customers });
  };

  handleEdit = (customer) => {
    console.log(customer);
  };

  getPageData = () => {
    const { sortColumn, customers: allCustomers } = this.state;

    const sorted = _.orderBy(
      allCustomers,
      [sortColumn.path],
      [sortColumn.order]
    );

    return { data: sorted };
  };

  render() {
    const { sortColumn } = this.state;
    const { data: customers } = this.getPageData();

    return (
      <React.Fragment>
        <CustomersTable
          customers={customers}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
        <div className="footer">
          <button className="btn btn-primary me-4" onClick={this.handleAdd}>
            Add Customer
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
