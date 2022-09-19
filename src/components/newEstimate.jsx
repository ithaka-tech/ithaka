import React, { Component } from "react";
import NewEstimateCustomize from "./newEstimateCustomize";
import NewEstimateForm from "./newEstimateForm";

class NewEstimate extends Component {
  state = {
    dataOne: {
      estimateName: "",
      customer: "",
      estimateDivision: "",
      estimateType: "",
      schedule: "",
      estimatePhase: "",
    },
    dataTwo: { estimates: [], sortColumn: { path: "_id", order: "asc" } },
    dataThree: {},
    currentPage: "1",
  };

  handleSave = (data) => {
    const { currentPage } = this.state;
    switch (currentPage) {
      case "1":
        this.setState({ dataOne: data });
        break;

      case "2":
        this.setState({ dataTwo: data });
        break;

      case "3":
        this.setState({ dataThree: data });
        break;

      default:
        break;
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage, dataOne, dataTwo } = this.state;
    switch (currentPage) {
      case "1":
        return (
          <NewEstimateForm
            data={dataOne}
            onPageChange={this.handlePageChange}
            onSave={this.handleSave}
          />
        );

      case "2":
        return (
          <NewEstimateCustomize
            data={dataTwo}
            onPageChange={this.handlePageChange}
            onSave={this.handleSave}
          />
        );

      case "3":
        return (
          <React.Fragment>
            <h1>Page 3</h1>
            <button onClick={() => this.handlePageChange("2")}>Back</button>
            <button>Save</button>
          </React.Fragment>
        );

      default:
        break;
    }
  }
}

export default NewEstimate;
