// SearchInput.jsx
import React from "react";

const SearchInput = ({ search, setSearch }) => {
  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <label className="me-2 fw-bold">Search:</label>
      <input
        type="text"
        className="form-control w-25"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
