import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ searchResults }) => {
  return (
    <div className="search-results-list">
      {searchResults.map((book, index) => {
        return <SearchResult key={index} book={book} />;
      })}
    </div>
  );
};
