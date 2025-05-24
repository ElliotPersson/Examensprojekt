import { useState, useEffect } from "react";

function SearchBar() {
  return (
    <div className="searchbar-wrapper">
      <input type="text" className="searchbar" placeholder="Search..." />
    </div>
  );
}

export default SearchBar;