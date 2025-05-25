import { useState, useEffect } from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="searchbar-wrapper">
      <input type="text" className="searchbar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
    </div>
  );
}

export default SearchBar;