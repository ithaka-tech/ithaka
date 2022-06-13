import React, { Component } from "react";
import { Routes } from "react-router-dom";
import SideBar from "./components/sideBar";
import NavBar from "./components/navBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="content">
          <NavBar />
          <h1>Hi this is the content area.</h1>
          <Routes></Routes>
        </div>
      </div>
    );
  }
}

export default App;
