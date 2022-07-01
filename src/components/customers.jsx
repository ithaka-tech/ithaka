import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import { getCustomers } from "../services/fakeCustomerService";
import SearchBox from "./common/searchBox";

const apiEndpoint = "";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 13,
    searchQuery: "",
    sortColumn: { path: "customer", order: "asc" },
  };

  componentDidMount() {
    this.setState({ customers: getCustomers() });
  }

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
    if (searchQuery)
      filtered = allCustomers.filter((c) =>
        c.customer.toLowerCase().startsWith(searchQuery.toLowerCase())
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
        <div>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div className="invisible "></div>
        </div>
        <CustomersTable
          customers={customers}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
        <div className="d-flex justify-content-between mb-4">
          <div className="invisible">Add Customer</div>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <Link to="new" className="btn btn-primary">
            Add Customer
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
