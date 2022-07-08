import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/dashboard";
import NewCustomerForm from "./components/newCustomerForm";
import SigninForm from "./components/signinForm";
import RegisterForm from "./components/registerForm";
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
        <Route path="register" element={<RegisterForm />} />
        <Route path="signin" element={<SigninForm />} />
        <Route path="/" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
