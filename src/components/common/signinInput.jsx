import React from "react";

const SigninInput = ({ name, id, label, placeholder, error, ...rest }) => {
  return (
    <div className="form-floating">
      <input
        {...rest}
        name={name}
        id={id}
        className="form-control"
        placeholder={placeholder}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default SigninInput;
