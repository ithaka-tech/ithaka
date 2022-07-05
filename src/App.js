import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/dashboard";
import NewCustomerForm from "./components/newCustomerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ToastContainer />
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
