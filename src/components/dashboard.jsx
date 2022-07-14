import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import SideBarItem from "./common/sideBarItem";
import NavBar from "./navBar";
import "../dashboard.css";

class DashBoard extends Component {
  state = {
    items: [
      { name: "Dashboard", icon: "bi bi-speedometer2" },
      { name: "Estimates", icon: "bi bi-calculator" },
      { name: "Customers", icon: "bi bi-people" },
    ],
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
                  <SideBarItem items={this.state.items} />
                  <hr />
                  <SideBarItem
                    items={[
                      { name: "Settings", icon: "bi bi-gear" },
                      { name: "Subscription", icon: "bi bi-arrow-repeat" },
                    ]}
                  />
                </ul>
              </div>
            </main>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4">
              <div className="content">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoard;
