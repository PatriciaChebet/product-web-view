import React, { useState } from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";
import { useQuery, gql } from "@apollo/client";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { SearchResult } from "./SearchResult";
import "./SearchBar.css";

const Input = React.forwardRef(function CustomInput(props, ref) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

const GET_SEARCH_RESULTS = gql`
  query ExampleQuery {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

export const SearchBar = ({
  setSearchResults,
  searchResults,
  readingList,
  updateReadingList,
}) => {
  const [input, setInput] = useState("");
  const [anchor, setAnchor] = useState("");

  const { loading, error, data } = useQuery(GET_SEARCH_RESULTS);

  const getSearchResults = (value) => {
    const searchResults = data.books.filter((book) => {
      return (
        value &&
        book &&
        book.title &&
        book.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchResults(searchResults);
  };

  const handleChange = (event, value) => {
    setInput(value);
    if (value.length > 0) {
      setAnchor(anchor ? null : event.currentTarget);
    }
    getSearchResults(value);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Input
        aria-describedby={id}
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e, e.target.value)}
      />
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
          {searchResults.map((book, index) => {
            return (
              <SearchResult
                key={index}
                book={book}
                readingList={readingList}
                updateReadingList={updateReadingList}
                anchor={anchor}
                setAnchor={setAnchor}
                input={input}
                setInput={setInput}
              />
            );
          })}
        </PopupBody>
      </BasePopup>
    </div>
  );
};

const turquoise = {
  100: "#CFFAFA",
  200: "#5ACCCC",
  400: "#53C2C2",
  500: "#28B8B8",
  600: "#28B8B8",
};

const grey = {
  50: "#F3F6F9",
  200: "#DAE2ED",
  300: "#C7D0DD",
  700: "#434D5B",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
    width: 320px;
    font-family: 'Mulish', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    margin-top: 16px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? primary : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${turquoise[400]};
    }
  
    &:focus {
      border-color: ${turquoise[400]};
      box-shadow: 0 0 0 0.2px ${
        theme.palette.mode === "dark" ? turquoise[600] : turquoise[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const PopupBody = styled("div")(
  ({ theme }) => `
  width: 320px;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  font-family: 'Mulish', sans-serif;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-size: 0.875rem;
  z-index: 1;
  max-height: 300px;
  overflow-y: scroll;
`
);
