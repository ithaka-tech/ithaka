import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFakeCustomers } from "../services/fakeCustomerService";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { paginate } from "../utils/paginate";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 13,
    searchQuery: "",
    sortColumn: { path: "customer", order: "asc" },
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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
          {totalCount > 0 && (
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          )}
          <Link to="new" className="btn btn-primary">
            Add Customer
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
