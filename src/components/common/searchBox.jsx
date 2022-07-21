import React from "react";

const SearchBox = ({ value, onChange, ...props }) => {
  return (
    <input
      {...props}
      type="text"
      name="query"
      className="form-control my-2"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
