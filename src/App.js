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
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [client, setClient] = useState("");

  useEffect(() => {
    const client = auth.getCurrentUser();
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
            <ProtectedRoute redirectPath="/signin" isAllowed={!!client}>
              <Dashboard client={client} />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<RegisterForm />} />
        <Route path="signout" element={<SignOut />} />
        <Route path="signin" element={<SigninForm navigate={navigate} />} />
        <Route path="/" element={<Navigate to="/home/dashboard" />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
