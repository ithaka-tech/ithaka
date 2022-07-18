import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { getFakeCustomers } from "../services/fakeCustomerService";
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

  componentDidMount() {
    // const sessionId = auth.getJwt();
    // const client = auth.getCurrentClient();
    // const response = await getCustomers(sessionId, client._id);
    // const customers = response.data.customer;
    // this.setState({ customers });
    const fakeCustomers = getFakeCustomers();
    this.setState({ customers: fakeCustomers });
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
      await deleteCustomer(customer._id);
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
        <div className="d-flex">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <Link to="new" className="btn btn-primary my-2 ms-3 text-nowrap">
            Add Customer
          </Link>
        </div>
        <CustomersTable
          customers={customers}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
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
