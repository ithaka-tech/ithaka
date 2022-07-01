import React, { Component } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import NewCustomerForm from "./components/newCustomerForm";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="home/customers/new"
          element={<NewCustomerForm navigate={navigate} />}
        />
        <Route path="/home/*" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
