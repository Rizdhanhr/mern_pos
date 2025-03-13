// SearchInput.jsx
import React from "react";

const SearchInput = ({ search, setSearch, setTableState }) => {
  const handleSearchChange = e => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setTableState(prevState => ({
      ...prevState,
      page: 1
    }));
  };

  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <label className="me-2 fw-bold">Search:</label>
      <input
        type="text"
        className="form-control w-25"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
