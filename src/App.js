import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/dashboard";
import NewCustomerForm from "./components/newCustomerForm";
import SigninForm from "./components/signinForm";
import RegisterForm from "./components/registerForm";
import SignOut from "./components/signout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import Estimates from "./components/estimates";
import Customers from "./components/customers";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [client, setClient] = useState("");

  useEffect(() => {
    const client = auth.getCurrentClient();
    setClient(client);
  }, []);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        <Route
          path="home/customers/new"
          element={<NewCustomerForm navigate={navigate} />}
        />
        <Route
          path="/home/*"
          element={
            <ProtectedRoute redirectPath="/signin" isAllowed={true}>
              <Dashboard client={client} navigate={navigate} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<h1>"/" dashboard</h1>} />
          <Route path="estimates" element={<Estimates />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<h1>"/" settings</h1>} />
          <Route path="subscription" element={<h1>"/" subscription</h1>} />
          <Route path="home/" element={<h1>"/" path</h1>} />
        </Route>
        <Route path="register" element={<RegisterForm />} />
        <Route path="signout" element={<SignOut />} />
        <Route path="signin" element={<SigninForm navigate={navigate} />} />
        <Route path="/" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
