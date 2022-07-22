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
import AddCustomerMethod from "./components/addCustomerMethod";
import SendEmailForm from "./components/sendEmailForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [client, setClient] = useState("");

  useEffect(() => {
    const client = auth.getCurrentClient();
    setClient(client);
    console.log("useEffect", client);
  }, []);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        <Route
          path="home/customers/:id"
          element={<NewCustomerForm navigate={navigate} />}
        />
        <Route
          path="home/customers/addmethod"
          element={<AddCustomerMethod />}
        />
        <Route path="home/customers/sendemail" element={<SendEmailForm />} />
        <Route
          path="/home/*"
          element={
            <ProtectedRoute redirectPath="/signin" isAllowed={!!client}>
              <Dashboard client={client} navigate={navigate} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<h1>Coming soon!</h1>} />
          <Route path="estimates" element={<Estimates />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<h1>Coming soon!</h1>} />
          <Route path="subscription" element={<h1>Coming soon!</h1>} />
        </Route>
        <Route path="register" element={<RegisterForm />} />
        <Route path="signout" element={<SignOut />} />
        <Route
          path="signin"
          element={
            <ProtectedRoute redirectPath="/" isAllowed={!client}>
              <SigninForm />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
