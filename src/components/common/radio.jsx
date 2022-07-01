import React from "react";

const Radio = ({ name, options, format, error, ...rest }) => {
  return (
    <div className={format}>
      {options.map((option) => (
        <div key={option._id + option.label} className="form-check">
          <input
            {...rest}
            id={option._id}
            name={name}
            value={option._id}
            className="form-check-input"
          />
          <label htmlFor={option._id} className="form-check-label">
            {option.label}
          </label>
        </div>
      ))}

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Radio;
