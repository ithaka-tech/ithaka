import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getEstimates, deleteEstimate } from "../services/estimateService";
import { paginate } from "../utils/paginate";
import EstimatesTable from "./estimatesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import auth from "../services/authService";

class Estimates extends Component {
  state = {
    estimates: [
      {
        _id: "#1234",
        division: "Mowing",
        name: "Joe Smith",
        date: "02/03/22",
        amount: "$1000.00",
        paymentMode: "Transfer to Bank",
        status: "Delivered",
      },
    ],
    currentPage: 1,
    pageSize: 13,
    searchQuery: "",
    sortColumn: { path: "customer", order: "asc" },
  };

  // async componentDidMount() {
  //   const sessionId = auth.getJwt();
  //   const response = await getEstimates(sessionId);
  //   const estimates = response.data.estimates;
  //   this.setState({ estimates });
  // }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = async (estimate) => {
    const originalEstimates = this.state.estimates;
    const estimates = originalEstimates.filter((e) => e._id !== estimate._id);
    this.setState({ estimates });

    try {
      const sessionId = auth.getJwt();
      await deleteEstimate(sessionId, estimate._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("This estimate has already been deleted.");

      this.setState({ estimates: originalEstimates });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      searchQuery,
      sortColumn,
      estimates: allEstimates,
    } = this.state;

    let filtered = allEstimates;

    if (!filtered) filtered = [];

    if (searchQuery)
      filtered = allEstimates.filter((e) =>
        e.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const estimates = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: estimates,
      visible: allEstimates.length,
    };
  };

  render() {
    const { currentPage, pageSize, searchQuery, sortColumn } = this.state;
    const { totalCount, data: estimates, visible } = this.getPageData();

    return (
      <React.Fragment>
        <div className="d-flex">
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            disabled={visible === 0}
          />
          <Link to="new" className="btn btn-primary my-2 ms-3 text-nowrap">
            Add Estimate
          </Link>
        </div>
        {visible > 0 && (
          <div className="mt-2">
            <EstimatesTable
              estimates={estimates}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />
          </div>
        )}
        {visible === 0 && (
          <h6 className="my-3 ms-1">
            Seems a little empty in here... Try adding an estimate.
          </h6>
        )}
        <div className="d-flex justify-content-center mb-4">
          {visible > 0 && (
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Estimates;
