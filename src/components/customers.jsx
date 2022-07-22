import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { paginate } from "../utils/paginate";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import auth from "../services/authService";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 13,
    searchQuery: "",
    sortColumn: { path: "customer", order: "asc" },
  };

  async componentDidMount() {
    const sessionId = auth.getJwt();
    const response = await getCustomers(sessionId);
    const customers = response.data.customers;
    this.setState({ customers });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleConfirmDelete = (customer) => {
    console.log(customer);
  };

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter((c) => c._id !== customer._id);
    this.setState({ customers });

    try {
      const sessionId = auth.getJwt();
      await deleteCustomer(sessionId, customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This customer has already been deleted.");

      this.setState({ customers: originalCustomers });
    }
  };

  handleEdit = (customer) => {
    console.log(customer);
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
      customers: allCustomers,
    } = this.state;

    let filtered = allCustomers;

    if (!filtered) filtered = [];

    if (searchQuery)
      filtered = allCustomers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { currentPage, pageSize, searchQuery, sortColumn } = this.state;
    const { totalCount, data: customers } = this.getPageData();

    return (
      <React.Fragment>
        <div className="d-flex">
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            disabled={totalCount === 0}
          />
          <Link
            to="addmethod"
            className="btn btn-primary my-2 ms-3 text-nowrap"
          >
            Add Customer
          </Link>
        </div>
        {totalCount > 0 && (
          <div className="mt-2">
            <CustomersTable
              customers={customers}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />
          </div>
        )}
        {totalCount === 0 && (
          <h6 className="my-3 ms-1">
            Seems a little empty in here... Try adding a customer.
          </h6>
        )}
        <div className="d-flex justify-content-center mb-4">
          {totalCount > 0 && (
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

export default Customers;
