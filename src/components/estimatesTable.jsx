import React, { Component } from "react";
import Table from "./common/table";
import DeleteConfirmation from "./deleteConfirmation";
import { Link } from "react-router-dom";

class EstimatesTable extends Component {
  columns = [
    { path: "_id", label: "Tracking ID" },
    { path: "division", label: "Division" },
    { path: "name", label: "Customer" },
    { path: "date", label: "Date" },
    { path: "amount", label: "Amount" },
    { path: "paymentMode", label: "Payment Mode" },
    { path: "status", label: "Status" },
    {
      key: "action",
      content: (estimate) => (
        <React.Fragment>
          <Link
            to={`../estimates/${estimate._id}`}
            className="btn btn-secondary btn-sm mx-1"
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
          <DeleteConfirmation
            data={estimate}
            dataName={estimate._id}
            className="btn btn-danger btn-sm m-1"
            onDelete={this.props.onDelete}
          />
        </React.Fragment>
      ),
    },
  ];

  render() {
    const { estimates, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={estimates}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default EstimatesTable;
