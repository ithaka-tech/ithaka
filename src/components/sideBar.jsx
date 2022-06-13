import React, { Component } from "react";
import SideBarItem from "./common/sideBarItem";
import SideBarItemCollapsed from "./common/sideBarItemCollapsed";

class SideBar extends Component {
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
        <div className="d-none d-lg-block">
          <main className="d-flex flex-nowrap">
            <div
              className="d-flex flex-column flex-shrink-0 p-3 text-white"
              style={{
                width: 280,
                height: "100vh",
                backgroundColor: "#363740",
              }}
            >
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <svg className="bi pe-none me-2" width="40" height="32">
                  {/* <use xlink:href="#bootstrap" /> */}
                </svg>
                <span className="fs-4">Ithaka</span>
              </a>
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
        </div>

        <div className="d-lg-none">
          <div
            className="d-flex flex-column flex-shrink-0"
            style={{
              width: "4.5rem",
              height: "100vh",
              backgroundColor: "#363740",
            }}
          >
            <a
              href="/"
              className="d-block p-3 link-dark text-decoration-none"
              title="Icon-only"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
            >
              <span className="d-flex align-items-center text-white text-decoration-none">
                Ithaka
              </span>
              <span className="visually-hidden">Icon-only</span>
            </a>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
              <SideBarItemCollapsed
                items={this.state.items}
                selectedItem={this.state.selectedItem}
                onItemSelect={this.handleItemSelect}
              />
              <SideBarItemCollapsed
                items={[
                  { name: "Settings", icon: "fa fa-gear" },
                  { name: "Subscription", icon: "fa fa-home" },
                ]}
                selectedItem={this.state.selectedItem}
                onItemSelect={this.handleItemSelect}
              />
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SideBar;
