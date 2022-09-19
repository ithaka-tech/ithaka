import React, { Component } from "react";
import FilterItemList from "./common/filterItemList";
import NewEstimatesTable from "./newEstimatesTable";

class NewEstimateCustomize extends Component {
  state = { estimates: [], sortColumn: { path: "_id", order: "asc" } };

  populateData() {
    const { estimates } = this.props.data;
    this.setState({ estimates });
  }

  componentDidMount() {
    this.populateData();
  }

  render() {
    const { estimates, sortColumn } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid d-flex justify-content-center bg-light">
          <div className="debug" style={{ height: "100vh", width: "67%" }}>
            <div className="debug my-2">
              <div style={{ height: "40vh" }}>
                <NewEstimatesTable
                  estimates={estimates}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                />
              </div>
              <div className="debug">This will be the estimate totals</div>
            </div>
            <div className="debug d-flex justify-content-around my-2">
              <FilterItemList />
              <FilterItemList />
              <FilterItemList />
            </div>

            <button
              className="w-45 btn btn-primary btn-lg m-1"
              onClick={() => this.props.onPageChange("1")}
            >
              Back
            </button>

            <button
              className="w-45 btn btn-primary btn-lg m-1"
              onClick={() => this.props.onPageChange("3")}
            >
              Next
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewEstimateCustomize;
