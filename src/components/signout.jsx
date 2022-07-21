import { useEffect } from "react";
import auth from "../services/authService";

const SignOut = () => {
  useEffect(() => {
    auth.signout();
    console.log("signout");
    window.location = "/signin";
  }, []);

  return null;
};

export default SignOut;
