import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import QueueIcon from "@mui/icons-material/Queue";
import "./SearchResult.css";

export const SearchResult = ({
  book,
  anchor,
  setAnchor,
  input,
  setInput,
  updateReadingList,
}) => {
  return (
    <div className="search-result">
      <Card fontSize={6}>
        <CardActionArea sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 100 }}
            image={book.coverPhotoURL}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="subtitle3">
                {book.title}
              </Typography>
              <Typography
                paddingTop={0.5}
                variant="subtitle4"
                color="text.secondary"
                component="div"
              >
                Written by {book.author}
              </Typography>
              <Typography
                variant="subtitle6"
                color="text.secondary"
                component="div"
                paddingTop={0.5}
              >
                Reading Level: {book.readingLevel}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
        <Button
          className="add-read-list"
          size="small"
          color="status"
          variant="text"
          padding={1}
          margin={1}
          startIcon={<QueueIcon />}
          onClick={(e) =>
            updateReadingList(e, book, anchor, input, setAnchor, setInput)
          }
        >
          Reading List
        </Button>
      </Card>
    </div>
  );
};
