import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { ReadingList } from "./ReadingList";

export const ProductView = () => {
  const [searchResults, setSearchResults] = useState([]);

  const [readingList, setReadingList] = useState([]);

  const updateReadingList = (
    event,
    book,
    anchor,
    input,
    setAnchor,
    setInput
  ) => {
    setAnchor(anchor ? null : event.currentTarget);
    input = "";
    setInput(input);

    if (readingList.includes(book)) {
      return;
    }
    setReadingList([...readingList, book]);
  };

  return (
    <div className="product-view">
      <h2>Add Books to a Reading List</h2>
      <SearchBar
        className="search-bar-container"
        setSearchResults={setSearchResults}
        searchResults={searchResults}
        updateReadingList={updateReadingList}
      />
      <ReadingList
        className="reading-list"
        readingList={readingList}
        setReadingList={setReadingList}
      />
    </div>
  );
};
