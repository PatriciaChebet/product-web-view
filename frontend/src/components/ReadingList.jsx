import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { ReadingItem } from "./ReadingItem";
import Alert from "@mui/material/Alert";
import "./ReadingList.css";

export const ReadingList = ({ readingList, setReadingList }) => {
  const [showAlert, setShowAlert] = useState(false);

  const paginate = (array, pageSize) => {
    const pageCount = Math.ceil(array.length / pageSize);
    return Array.from({ length: pageCount }, (_, index) =>
      array.slice(index * pageSize, (index + 1) * pageSize)
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const paginatedBooks = paginate(readingList, pageSize);
  const currentBooks = paginatedBooks[currentPage - 1];

  const removeFromReadingList = (book) => {
    const updatedReadingList = readingList.filter((readingListBook) => {
      return readingListBook.title !== book.title;
    });
    setReadingList(updatedReadingList);
    setShowAlert(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={3}
        marginTop={2}
        sx={{ flexDirection: { xs: "column", sm: "row", md: "row" } }}
      >
        {currentBooks &&
          currentBooks.map((book, index) => {
            return (
              <Grid
                item
                xs={4}
                key={index}
                book={book}
                sx={{
                  maxWidth: 345,
                  minHeight: 328,
                  minWidth: { xs: "345", sm: "300", md: "345" },
                }}
              >
                <ReadingItem
                  key={index}
                  book={book}
                  removeFromReadingList={removeFromReadingList}
                />
              </Grid>
            );
          })}
      </Grid>
      {paginatedBooks[0] && paginatedBooks[0].length > 5 && (
        <Box
          margin={2}
          padding={2}
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            count={paginatedBooks[0].length}
            page={currentPage}
            onChange={(_, newPage) => setCurrentPage(newPage)}
          />
        </Box>
      )}
      {showAlert && (
        <Alert
          className={`modal-alert ${showAlert ? "animate" : ""}`}
          severity="success"
          color="warning"
          sx={{ position: "fixed", top: 10, right: 10 }}
          onAnimationEnd={() => setShowAlert(false)}
        >
          Book removed from reading list!
        </Alert>
      )}
    </Box>
  );
};
