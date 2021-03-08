import React from "react";

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Search">
      <h2>And here you can search for a specific character!</h2>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        ref={searchInput}
        placeholder="Just type and see the magic..."
      />
    </div>
  );
};

export default Search;