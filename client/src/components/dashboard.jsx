import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import SideBarItem from "./common/sideBarItem";
import Customers from "./customers";
import Estimates from "./estimates";
import "../dashboard.css";
import NavBar from "./navBar";

class DashBoard extends Component {
  state = {
    items: [
      { name: "Dashboard", icon: "fa fa-columns" },
      { name: "Estimates", icon: "fa fa-money" },
      { name: "Customers", icon: "fa fa-user" },
    ],
    selectedItem: "Dashboard",
  };

  handleItemSelect = (item) => {
    this.setState({ selectedItem: item });
  };
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <div className="container-fluid">
          <div className="row">
            <main className="d-flex flex-nowrap">
              <div
                id="sibebarMenu"
                className="col-md-3 col-lg-2 d-md-block text-white sidebar collapse"
                style={{
                  backgroundColor: "#363740",
                }}
              >
                <ul className="nav nav-pills flex-column mb-auto mt-3">
                  <SideBarItem
                    items={this.state.items}
                    selectedItem={this.state.selectedItem}
                    onItemSelect={this.handleItemSelect}
                  />
                  <hr />
                  <SideBarItem
                    items={[
                      { name: "Settings", icon: "fa fa-gear" },
                      { name: "Subscription", icon: "fa fa-home" },
                    ]}
                    selectedItem={this.state.selectedItem}
                    onItemSelect={this.handleItemSelect}
                  />
                </ul>
              </div>
            </main>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4">
              <div className="content">
                <Routes>
                  <Route path="/dashboard" element={<h1>"/" dashboard</h1>} />
                  <Route path="/estimates" element={<Estimates />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/settings" element={<h1>"/" settings</h1>} />
                  <Route
                    path="/subscription"
                    element={<h1>"/" subscription</h1>}
                  />
                  <Route path="/" element={<h1>"/" path</h1>} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoard;
