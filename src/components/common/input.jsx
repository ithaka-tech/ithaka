import React from "react";

const Input = ({ name, label, format, placeholder, error, ...rest }) => {
  return (
    <div className={format}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
